'use strict';

/**
 * @typedef {import('eslint').Rule.RuleModule} RuleModule
 *
 * @typedef {RuleModule['create']} RuleCreate
 */

const { loadRules } = require('../utils/load-rules');

module.exports = loadRules();
