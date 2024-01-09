/**
 * @param {RuleContext} context
 */
function isInVueSfc(context) {
    return Boolean(context.parserServices.defineTemplateBodyVisitor);
}

module.exports = { isInVueSfc };
