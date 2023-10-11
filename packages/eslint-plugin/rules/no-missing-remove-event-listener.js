const { createRule } = require('./utils/listener/create-rule');
const { RuleType } = require('./utils/listener/utils');

module.exports = createRule(RuleType.MissingRemoveEventListener);
