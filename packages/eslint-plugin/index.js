'use strict';

const rules = require('./rules/index');

/**
 * @type {ESLintPlugin}
 */
module.exports = {
    meta: {
        name: '@yutengjing/eslint-plugin',
    },
    rules,
};
