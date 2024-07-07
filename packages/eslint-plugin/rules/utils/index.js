/**
 * @param {RuleContext} context
 */
function isInVueSfc(context) {
    return Boolean(context.parserServices.defineTemplateBodyVisitor);
}

/**
 * @param {any} keyNode Property key node
 */
function isMuiSxSelectorNode(keyNode) {
    const { value: selector } = keyNode;
    return keyNode.type === 'Literal' && typeof selector === 'string';
}

module.exports = { isInVueSfc, isMuiSxSelectorNode };
