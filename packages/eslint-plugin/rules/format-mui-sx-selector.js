'use strict';

const { isMuiSxSelectorNode } = require('./utils');

const MESSAGE_ID_DEFAULT = 'default';

/** @type {import('./index').RuleCreate} */
const create = (ctx) => {
    const extraSpaceRegex = /\s{2,}/g;
    return {
        Property(node) {
            const stringKeyNode = node.key;
            const isMuiSxSelector = isMuiSxSelectorNode(stringKeyNode);
            if (isMuiSxSelector) {
                const { value: selector } = stringKeyNode;
                const formattedSelector = selector.replaceAll(extraSpaceRegex, ' ').trim();
                if (selector !== formattedSelector) {
                    ctx.report({
                        node: stringKeyNode,
                        messageId: MESSAGE_ID_DEFAULT,
                        fix(fixer) {
                            const quote = stringKeyNode.raw[0];
                            return fixer.replaceText(
                                stringKeyNode,
                                `${quote}${formattedSelector}${quote}`,
                            );
                        },
                    });
                }
            }
        },
    };
};

/**
 * ```js
 * // failed
 * const sx = {
 *     '&.MuiButton-root  .box': {
 *         color: 'red',
 *     },
 * };
 *
 * // pass
 * const sx = {
 *     '&.MuiButton-root .box': {
 *         color: 'red',
 *     },
 * };
 * ```
 *
 * 连续的空格只保留一个空格;
 *
 * @type {import('./index').RuleModule}
 */
module.exports = {
    meta: {
        type: 'layout',
        fixable: 'code',
        schema: [],
        messages: {
            [MESSAGE_ID_DEFAULT]: 'mui sx selector format can be more pretty',
        },
    },
    create,
};
