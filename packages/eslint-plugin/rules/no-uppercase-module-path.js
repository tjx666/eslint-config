'use strict';

const MESSAGE_ID_DEFAULT = 'default';

/** @type {RuleCreate} */
const create = (context) => {
    const options = context.options[0] ?? {};
    const ignoreList = (options.ignoreList ?? []).map((pattern) => new RegExp(pattern));

    return {
        ImportDeclaration(node) {
            // 检查是否在忽略列表中，如果在则返回
            const importedModulePath = node.source.value;
            if (ignoreList.some((ignore) => ignore.test(importedModulePath))) {
                return;
            }

            if (importedModulePath.toLowerCase() !== importedModulePath) {
                context.report({ node, messageId: MESSAGE_ID_DEFAULT });
            }
        },
    };
};

/** @type {RuleModule} */
module.exports = {
    meta: {
        type: 'problem',
        schema: [
            {
                type: 'object',
                properties: {
                    ignoreList: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                        uniqueItems: true,
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            [MESSAGE_ID_DEFAULT]: '禁止模块路径大写！',
        },
    },
    create,
};
