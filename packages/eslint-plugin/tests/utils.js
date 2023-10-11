'use strict';

const { RuleTester } = require('eslint');

/** @type {ConfigData} */
const config = {
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
        parser: '@typescript-eslint/parser',
        requireConfigFile: false,
        ecmaVersion: 2023,
        sourceType: 'module',
        ecmaFeatures: {
            globalReturn: false,
            impliedStrict: false,
            jsx: false,
        },
    },
};

const ruleTester = new RuleTester(config);
module.exports = {
    ruleTester,
};
