'use strict';

const fs = require('fs');
const path = require('path');
const jsonParser = require('jsonc-parser');

function has(map, path) {
    let inner = map;
    for (const step of path.split('.')) {
        inner = inner[step];
        if (inner === undefined) {
            return false;
        }
    }
    return true;
}

function findDirWithFile(filename, startDir) {
    let dir = path.resolve(startDir);
    const root = path.parse(dir).root;

    while (dir !== root) {
        if (fs.existsSync(path.join(dir, filename))) {
            return dir;
        }
        dir = path.dirname(dir);
    }

    if (fs.existsSync(path.join(root, filename))) {
        return root;
    }
}

function getImportPrefixToAlias(paths) {
    const reversed = {};
    for (const key of Object.keys(paths)) {
        for (const path of paths[key]) {
            // ./components/* -> components/*
            const normalizedPath = path.startsWith('./') ? path.slice(2) : path;
            reversed[normalizedPath] = key;
        }
    }
    return reversed;
}

function getBaseUrlAndPaths(baseDir) {
    let url = '';
    let paths = {};

    if (fs.existsSync(path.join(baseDir, 'tsconfig.json'))) {
        const tsconfig = jsonParser.parse(
            fs.readFileSync(path.join(baseDir, 'tsconfig.json')).toString(),
        );
        if (has(tsconfig, 'compilerOptions.baseUrl')) {
            url = tsconfig.compilerOptions.baseUrl;
        }
        if (has(tsconfig, 'compilerOptions.paths')) {
            paths = tsconfig.compilerOptions.paths;
        }
    } else if (fs.existsSync(path.join(baseDir, 'jsconfig.json'))) {
        const jsconfig = jsonParser.parse(
            fs.readFileSync(path.join(baseDir, 'jsconfig.json')).toString(),
        );
        if (has(jsconfig, 'compilerOptions.baseUrl')) {
            url = jsconfig.compilerOptions.baseUrl;
        }
        if (has(jsconfig, 'compilerOptions.paths')) {
            paths = jsconfig.compilerOptions.paths;
        }
    }

    return [path.join(baseDir, url), paths];
}

function getExpectedPath(
    importPath,
    absolutePath,
    baseUrl,
    importPrefixToAlias,
    onlyPathAliases,
    onlyAbsoluteImports,
    respectAliasOrder,
) {
    let relativeToBasePath = path.relative(baseUrl, absolutePath);
    const isRelative = importPath.startsWith('.');

    /**
     * 辅助函数，用于处理路径结尾的 '/*'
     */
    const trimWildcard = (p) => (p.endsWith('/*') ? p.replace('/*', '') : p);

    if (!onlyAbsoluteImports) {
        if (!isRelative) {
            // for example:
            // "@/components/*": ["lib/components/*"],
            // "@/lib/*": ["lib/*"],
            //
            // @/lib/components/a.ts -> @/components/a.ts
            if (respectAliasOrder) {
                let findAlias = false;
                for (const [prefix, aliasPath] of Object.entries(importPrefixToAlias)) {
                    const importPrefix = trimWildcard(prefix);
                    const aliasImport = trimWildcard(aliasPath);
                    if (importPath.startsWith(aliasImport)) {
                        relativeToBasePath = importPath.replace(aliasImport, importPrefix);
                        findAlias = true;
                        break;
                    }
                }

                // prefer use alias instead of absolutePath
                // for example: when config alias "@/lib/*": ["lib/*"]
                // lib/a -> @/lib/a
                if (!findAlias) {
                    for (const [prefix, aliasPath] of Object.entries(importPrefixToAlias)) {
                        const importPrefix = trimWildcard(prefix);
                        const aliasImport = trimWildcard(aliasPath);
                        // consider: importPath: typesaurus, alias: @/types: types/*
                        if (importPath.startsWith(`${importPrefix}/`)) {
                            return `${aliasImport}${importPath.slice(importPrefix.length)}`;
                        }
                    }
                    return;
                }
            } else {
                return;
            }
        }

        for (const [prefix, aliasPath] of Object.entries(importPrefixToAlias)) {
            // assuming they are either a full path or a path ends with /*, which are the two standard cases
            const importPrefix = trimWildcard(prefix);
            const aliasImport = trimWildcard(aliasPath);
            if (relativeToBasePath.startsWith(importPrefix)) {
                return `${aliasImport}${relativeToBasePath.slice(importPrefix.length)}`;
            }
        }
    }

    if (!onlyPathAliases && isRelative) {
        return relativeToBasePath;
    }
}
const optionsSchema = {
    type: 'object',
    properties: {
        onlyPathAliases: {
            type: 'boolean',
        },
        onlyAbsoluteImports: {
            type: 'boolean',
        },
        respectAliasOrder: {
            type: 'boolean',
        },
    },
};

const configCache = new Map();

function create(context) {
    const options = context.options[0] || {};
    const onlyPathAliases = options.onlyPathAliases || false;
    const onlyAbsoluteImports = options.onlyAbsoluteImports || false;
    const respectAliasOrder = options.respectAliasOrder || false;

    const filename = context.getFilename();
    const baseDir = findDirWithFile('package.json', path.dirname(filename));

    if (!baseDir) {
        return {};
    }

    if (!configCache.has(baseDir)) {
        const [baseUrl, paths] = getBaseUrlAndPaths(baseDir);
        configCache.set(baseDir, {
            baseUrl,
            paths,
            importPrefixToAlias: getImportPrefixToAlias(paths),
        });
    }

    const config = configCache.get(baseDir);

    return {
        ImportDeclaration(node) {
            const importPath = node.source.value;
            const filename = context.getFilename();

            const absolutePath = path.normalize(path.join(path.dirname(filename), importPath));
            const expectedPath = getExpectedPath(
                importPath,
                absolutePath,
                config.baseUrl,
                config.importPrefixToAlias,
                onlyPathAliases,
                onlyAbsoluteImports,
                respectAliasOrder,
            );

            if (expectedPath && importPath !== expectedPath) {
                const isRelative = importPath.startsWith('.');
                const errorMessage = isRelative
                    ? `Relative imports are not allowed. Please use '${expectedPath}' instead of '${importPath}'.`
                    : `Please prefer using alias '${expectedPath}' instead of '${importPath}'.`;

                context.report({
                    node,
                    message: errorMessage,
                    fix(fixer) {
                        return fixer.replaceText(node.source, `'${expectedPath}'`);
                    },
                });
            }
        },
    };
}

module.exports = {
    meta: {
        fixable: true,
        schema: [optionsSchema],
    },
    create,
};
