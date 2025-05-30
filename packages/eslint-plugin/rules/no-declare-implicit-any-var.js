'use strict';

const path = require('node:path');
const localPkg = require('local-pkg');

// https://github.com/antfu/eslint-config/blob/v4.13.0/src/factory.ts#L50
const VuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli'];

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

    const enableVue = ext === '.vue' || VuePackages.some((i) => localPkg.isPackageExists(i));

    return {
        VariableDeclaration(node) {
            // except for (let item of arr)
            if (node.parent?.type === 'ForOfStatement' || node.parent?.type === 'ForInStatement')
                return;

            if (new Set(['const', 'let']).has(node.kind)) {
                for (const declarator of node.declarations) {
                    const { init } = declarator;
                    // let a;
                    // let a = [];
                    // const a = ref();
                    // const a = ref([]);
                    if (
                        declarator.id.typeAnnotation == null &&
                        (init === null ||
                            (init.type === 'ArrayExpression' && init.elements.length === 0) ||
                            (enableVue &&
                                init.type === 'CallExpression' &&
                                init.callee.type === 'Identifier' &&
                                init.callee.name === 'ref' &&
                                init.typeArguments == null &&
                                (init.arguments.length === 0 ||
                                    (init.arguments[0].type === 'ArrayExpression' &&
                                        init.arguments[0].elements.length === 0))))
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
