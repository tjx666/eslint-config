'use strict';

const path = require('node:path');

const MESSAGE_ID_DEFAULT = 'default';

const tsFileExts = new Set(['ts', 'tsx', 'cts', 'mts'].map((ext) => `.${ext}`));
/** @type {RuleCreate} */
const create = (context) => {
    const ext = path.extname(context.filename).toLowerCase();
    // 只处理 .ts 和 lang=ts 的 .vue 文件
    const isTs =
        tsFileExts.has(ext) ||
        (ext === '.vue' &&
            /<script\s[^>]*?\blang=['"]ts['"][^>]*>/.test(context.sourceCode.getText()));
    if (!isTs) return {};

    return {
        VariableDeclaration(node) {
            // except for (let item of arr)
            if (node.parent?.type === 'ForOfStatement') return;

            if (new Set(['const', 'let']).has(node.kind)) {
                for (const declarator of node.declarations) {
                    const { init } = declarator;
                    // let a;
                    // let a = [];
                    if (
                        declarator.id.typeAnnotation == null &&
                        (init === null ||
                            (init.type === 'ArrayExpression' && init.elements.length === 0))
                    ) {
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
            [MESSAGE_ID_DEFAULT]: "don't declare variable without type",
        },
    },
    create,
};
