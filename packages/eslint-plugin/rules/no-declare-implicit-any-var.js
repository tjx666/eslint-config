'use strict';

const MESSAGE_ID_DEFAULT = 'default';

/** @type {RuleCreate} */
const create = (context) => {
    // 只处理 .ts 和 lang=ts 的 .vue 文件
    if (
        context.filename.endsWith('.vue') &&
        !/<script\s[^>]*?\blang=['"](ts)['"][^>]*>/.test(context.getSourceCode().getText())
    ) {
        return {};
    }

    return {
        VariableDeclaration(node) {
            // 排除 for (let item of arr) 这种情况
            if (node.parent?.type === 'ForOfStatement') return;

            if (node.kind === 'let') {
                for (const declarator of node.declarations) {
                    if (declarator.init === null && declarator.id.typeAnnotation == null) {
                        context.report({
                            node: declarator,
                            messageId: MESSAGE_ID_DEFAULT,
                        });
                    }
                }
            }
        },
    };
};

/** @type {RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
        schema: [],
        messages: {
            [MESSAGE_ID_DEFAULT]: '禁止隐式声明类型为 any 的变量',
        },
    },
    create,
};
