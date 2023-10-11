const RuleType = {
    MissingRemoveEventListener: 'no-missing-remove-event-listener',
    MatchingRemoveEventListener: 'matching-remove-event-listener',
    InlineFunctionEventListener: 'no-inline-function-event-listener',
};

const isNodeIdentifier = (node) => node?.type === 'Identifier';
const isNodeMemberExpression = (node) => node?.type === 'MemberExpression';
const isNodeThisExpression = (node) => node?.type === 'ThisExpression';
const isNodeFunctionExpression = (node) => node?.type === 'FunctionExpression';
const isNodeArrowFunctionExpression = (node) => node?.type === 'ArrowFunctionExpression';

const parseMemberExpression = (node) => {
    let value;

    if (isNodeIdentifier(node.object)) {
        value = node.object.name;
    }

    if (isNodeMemberExpression(node.object)) {
        value = parseMemberExpression(node.object);
    }

    if (isNodeThisExpression(node.object)) {
        value = `this.${node.property.name}`;
    }

    return value;
};

module.exports = {
    RuleType,

    isNodeIdentifier,
    isNodeMemberExpression,
    isNodeThisExpression,
    isNodeFunctionExpression,
    isNodeArrowFunctionExpression,

    parseMemberExpression,
};
