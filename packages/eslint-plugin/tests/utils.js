// @ts-check

'use strict';

const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
    languageOptions: {
        parser: require('vue-eslint-parser'),
        parserOptions: {
            parser: '@typescript-eslint/parser',
            requireConfigFile: false,
            ecmaVersion: 2023,
            sourceType: 'module',
            ecmaFeatures: {
                globalReturn: false,
                impliedStrict: false,
                jsx: true,
            },
        },
    },
});

module.exports = {
    ruleTester,
};
