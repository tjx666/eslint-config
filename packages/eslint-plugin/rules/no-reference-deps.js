'use strict';

const path = require('node:path');

/** @type {RuleCreate} */
const create = (context) => {
    const filePath = context.filename;
    const filename = path.basename(filePath);

    if (filename !== 'package.json') return {};

    if (!context.parserServices.isJSON) {
        return {};
    }

    const { options } = context;
    let pkg;
    try {
        pkg = JSON.parse(context.getSourceCode().getText());
    } catch {
        return {};
    }

    if (!pkg?.name) return {};
    const matchedOption = options.find((option) =>
        new RegExp(option.packagesPattern).test(pkg.name),
    );
    if (!matchedOption) return {};

    if (!matchedOption.referencedPackagesPattern) return {};
    const referencedPackagesPattern = new RegExp(matchedOption.referencedPackagesPattern);

    const { message } = matchedOption;
    const validDeps = new Set(['dependencies', 'devDependencies', 'peerDependencies']);
    return {
        JSONProperty(node) {
            if (!validDeps.has(node.key?.value) || !node.value?.properties) {
                return;
            }

            for (const property of node.value.properties) {
                const dep = property.key?.value;
                if (dep && referencedPackagesPattern.test(dep)) {
                    context.report({
                        node: property.key,
                        // eslint-disable-next-line eslint-plugin/prefer-message-ids
                        message,
                    });
                }
            }
        },
    };
};

/** @type {RuleModule} */
module.exports = {
    meta: {
        type: 'problem',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    packagesPattern: {
                        type: 'string',
                        default: '',
                    },
                    referencedPackagesPattern: {
                        type: 'string',
                        default: '',
                    },
                    message: {
                        type: 'string',
                        default: '禁止依赖这个包',
                    },
                },
            },
            default: [],
        },
        messages: [],
    },
    create,
};
