'use strict';

const { isMuiSxSelectorNode } = require('./utils');

const MESSAGE_ID_DEFAULT = 'default';

/** @type {import('./index').RuleCreate} */
const create = (ctx) => {
    return {
        Property(node) {
            const stringKeyNode = node.key;
            const { value: selector } = stringKeyNode;
            const regexp = /(^|[^.])Mui/g;
            if (isMuiSxSelectorNode(stringKeyNode) && regexp.test(selector)) {
                ctx.report({
                    node: stringKeyNode,
                    messageId: MESSAGE_ID_DEFAULT,
                    fix(fixer) {
                        const quote = stringKeyNode.raw[0];
                        return fixer.replaceText(
                            stringKeyNode,
                            `${quote}${selector.replaceAll(regexp, `$1.Mui`)}${quote}`,
                        );
                    },
                });
            }
        },
    };
};

/**
 * ```js
 * // failed
 * const sx = {
 *     'Mui-selectedMui-expanded': {
 *         color: 'red',
 *     },
 * };
 *
 * // pass
 * const sx = {
 *     '.Mui-selected.Mui-expanded': {
 *         color: 'red',
 *     },
 * };
 * ```
 *
 * Mui 开头的字符串肯定是类型，前面必须有点
 *
 * @type {import('./index').RuleModule}
 */
module.exports = {
    meta: {
        type: 'problem',
        fixable: 'code',
        schema: [],
        messages: {
            [MESSAGE_ID_DEFAULT]: 'mui sx selector class missing dot',
        },
    },
    create,
};
