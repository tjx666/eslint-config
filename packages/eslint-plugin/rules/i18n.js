'use strict';

const { isInVueSfc } = require('./utils');

const MESSAGE_ID_DEFAULT = 'default';
const MESSAGE_ID_SIMPLIFY = 'simplify';
const MESSAGE_ID_MANUALLY_FIX = 'manuallyFix';

function containsChineseCharacters(str) {
    return /[\u4E00-\u9FA5]/.test(str);
}

/**
 * @param {RuleContext} context
 */
function checkStringLiteral(context, node) {
    if (containsChineseCharacters(node.value)) {
        const { parent } = node;

        // console.log('xxx')
        if (
            parent.type === 'CallExpression' &&
            parent.callee.type === 'MemberExpression' &&
            parent.callee.object.name === 'console'
        ) {
            return;
        }

        // new Error('xxx')
        if (parent.type === 'NewExpression' && parent.callee.name.includes('Error')) {
            return;
        }

        const hadI18n =
            parent.type === 'CallExpression' &&
            (parent.callee.name === '$tsl' ||
                // i18n.$tsl
                (parent.callee.type === 'MemberExpression' &&
                    parent.callee.object.name === 'i18n' &&
                    parent.callee.property.name === '$tsl'));
        if (!hadI18n) {
            context.report({
                node,
                messageId: MESSAGE_ID_DEFAULT,
                suggest: [
                    {
                        messageId: MESSAGE_ID_MANUALLY_FIX,
                        fix: (fixer) => {
                            const sourceCode = context.getSourceCode();
                            const literalText = sourceCode.getText(node);
                            return fixer.replaceText(node, `$tsl(${literalText})`);
                        },
                    },
                ],
            });
        }

        // i18n.$tsl('') 应该简化为 $tsl('')
        if (hadI18n && parent.callee.type === 'MemberExpression') {
            context.report({
                node: node.parent,
                messageId: MESSAGE_ID_SIMPLIFY,
            });
        }
    }
}

/** @type {RuleCreate} */
const create = (context) => {
    /** @type {RuleListener} */
    const commonVisiters = {
        Literal(node) {
            if (typeof node.value === 'string') {
                return checkStringLiteral(context, node);
            }
        },
    };

    if (isInVueSfc(context)) {
        return context.parserServices.defineTemplateBodyVisitor(
            {
                VExpressionContainer(node) {
                    if (node.expression && node.expression.type === 'Literal') {
                        checkStringLiteral(context, node.expression);
                    }
                },
                /**
                 * @param {VLiteral} node
                 */
                VLiteral(node) {
                    if (containsChineseCharacters(node.value)) {
                        context.report({
                            node,
                            messageId: MESSAGE_ID_DEFAULT,
                            suggest: [
                                {
                                    messageId: MESSAGE_ID_MANUALLY_FIX,
                                    fix: (fixer) => {
                                        const sourceCode = context.getSourceCode();
                                        const attributeText = sourceCode.getText(node.parent);
                                        const valueText = sourceCode.getText(node);
                                        const directiveText = `:${attributeText}`.replace(
                                            valueText,
                                            `"$tsl('${valueText.slice(1, -1)}')"`,
                                        );
                                        return fixer.replaceText(node.parent, directiveText);
                                    },
                                },
                            ],
                        });
                    }
                },
                VText(node) {
                    checkStringLiteral(context, node);
                },
            },
            commonVisiters,
        );
    }

    return commonVisiters;
};

/** @type {RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
        schema: [],
        fixable: 'code',
        hasSuggestions: true,
        messages: {
            [MESSAGE_ID_DEFAULT]: '没有处理国际化',
            [MESSAGE_ID_SIMPLIFY]: '直接从 @design/locales 导入 $tsl，而不是 i18n',
            [MESSAGE_ID_MANUALLY_FIX]: '使用 $tsl 处理国际化',
        },
    },
    create,
};
