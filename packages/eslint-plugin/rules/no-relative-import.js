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

function findDirWithFile(filename) {
    let dir = path.resolve(filename);

    do {
        dir = path.dirname(dir);
    } while (!fs.existsSync(path.join(dir, filename)) && dir !== '/');

    if (!fs.existsSync(path.join(dir, filename))) {
        return;
    }

    return dir;
}

function getImportPrefixToAlias(paths) {
    const reversed = {};
    for (const key of Object.keys(paths)) {
        for (const path of paths[key]) {
            reversed[path] = key;
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
    if (!onlyAbsoluteImports) {
        if (!isRelative) {
            // @/lib/components/a.ts -> @/components/a.ts
            if (respectAliasOrder) {
                let findAlias = false;
                for (const [prefix, aliasPath] of Object.entries(importPrefixToAlias)) {
                    const importPrefix = prefix.endsWith('/*') ? prefix.replace('/*', '') : prefix;
                    const aliasImport = aliasPath.endsWith('/*')
                        ? aliasPath.replace('/*', '')
                        : aliasPath;
                    if (importPath.startsWith(aliasImport)) {
                        relativeToBasePath = importPath.replace(aliasImport, importPrefix);
                        findAlias = true;
                        break;
                    }
                }

                // prefer use alias instead of absolutePath, for example: lib/a -> @/lib/a
                if (!findAlias) {
                    for (const prefix of Object.keys(importPrefixToAlias)) {
                        const aliasPath = importPrefixToAlias[prefix];
                        // assuming they are either a full path or a path ends with /*, which are the two standard cases
                        const importPrefix = prefix.endsWith('/*')
                            ? prefix.replace('/*', '')
                            : prefix;
                        const aliasImport = aliasPath.endsWith('/*')
                            ? aliasPath.replace('/*', '')
                            : aliasPath;
                        if (importPath.startsWith(importPrefix)) {
                            return `${aliasImport}${importPath.slice(importPrefix.length)}`;
                        }
                    }
                    return;
                }
            } else {
                return;
            }
        }

        for (const prefix of Object.keys(importPrefixToAlias)) {
            const aliasPath = importPrefixToAlias[prefix];
            // assuming they are either a full path or a path ends with /*, which are the two standard cases
            const importPrefix = prefix.endsWith('/*') ? prefix.replace('/*', '') : prefix;
            const aliasImport = aliasPath.endsWith('/*') ? aliasPath.replace('/*', '') : aliasPath;
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

function generateRule(context, errorMessagePrefix) {
    const options = context.options[0] || {};
    const onlyPathAliases = options.onlyPathAliases || false;
    const onlyAbsoluteImports = options.onlyAbsoluteImports || false;
    const respectAliasOrder = options.respectAliasOrder || false;

    const baseDir = findDirWithFile('package.json');
    const [baseUrl, paths] = getBaseUrlAndPaths(baseDir);
    const importPrefixToAlias = getImportPrefixToAlias(paths);

    return {
        ImportDeclaration(node) {
            const importPath = node.source.value;
            const filename = context.getFilename();

            const absolutePath = path.normalize(path.join(path.dirname(filename), importPath));
            const expectedPath = getExpectedPath(
                importPath,
                absolutePath,
                baseUrl,
                importPrefixToAlias,
                onlyPathAliases,
                onlyAbsoluteImports,
                respectAliasOrder,
            );

            if (expectedPath && importPath !== expectedPath) {
                context.report({
                    node,
                    message: `${errorMessagePrefix}. Use \`${expectedPath}\` instead of \`${importPath}\`.`,
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
    create(context) {
        return generateRule(context, 'Relative imports are not allowed');
    },
};
