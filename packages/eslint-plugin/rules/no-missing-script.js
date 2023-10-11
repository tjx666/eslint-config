'use strict';

const path = require('node:path');
const fs = require('node:fs');

/** @type {RuleCreate} */
const create = (context) => {
    const filePath = context.filename;
    const filename = path.basename(filePath);

    if (filename !== 'package.json') return {};

    if (!context.parserServices.isJSON) {
        return {};
    }

    return {
        JSONProperty(node) {
            if (node.parent?.parent?.parent?.type !== 'Program') return;

            if (node.key.value !== 'scripts') return;

            const _isTsProject = fs.existsSync(
                path.resolve(path.dirname(filePath), 'tsconfig.json'),
            );

            for (const { scriptNames, isTsProject, message } of context.options) {
                if (isTsProject && !_isTsProject) continue;

                const missingScripts = [];
                scriptNames.forEach((scriptName) => {
                    if (
                        node.value.properties.every((property) => property.key.value !== scriptName)
                    ) {
                        missingScripts.push(scriptName);
                    }
                });

                if (missingScripts.length > 0) {
                    context.report({
                        node,
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
                    scriptNames: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                        default: [],
                    },
                    isTsProject: {
                        type: 'boolean',
                    },
                    message: {
                        type: 'string',
                    },
                },
            },
            default: [],
        },
        messages: [],
    },
    create,
};
