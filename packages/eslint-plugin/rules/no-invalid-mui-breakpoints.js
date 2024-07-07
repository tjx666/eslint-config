'use strict';

/** @type {import('./index').RuleCreate} */
const create = (ctx) => {
    const validBreakpoints = new Set(['xs', 'sm', 'md', 'lg', 'xl']);
    return {
        ObjectExpression(node) {
            const isSxResponsiveObjectValue =
                node.properties.every(
                    (property) =>
                        property.type === 'Property' && property.key?.type === 'Identifier',
                ) && node.properties.some((property) => validBreakpoints.has(property.key.name));
            if (!isSxResponsiveObjectValue) {
                return;
            }

            for (const property of node.properties) {
                if (!validBreakpoints.has(property.key.name)) {
                    ctx.report({
                        node: property.key,
                        message: `Invalid breakpoint "${property.key.name}"`,
                    });
                }
            }
        },
    };
};

/**
 * ```js
 * // 对于任意对象字面量
 *
 * // failed
 * const sx = {
 *     width: {
 *         sx: 100,
 *         md: 200,
 *     },
 * };
 *
 * // pass
 * const sx = {
 *     width: {
 *         xs: 100,
 *         md: 200,
 *     },
 * };
 * ```
 *
 * Mui 中有效的断点是 xs, sm, md, lg, xl
 *
 * @type {import('./index').RuleModule}
 */
module.exports = {
    meta: {
        type: 'problem',
        schema: [],
    },
    create,
};
