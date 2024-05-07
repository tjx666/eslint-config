// @ts-check

/** @type {any} */
const basic = require('@yutengjing/eslint-config-basic');
const { defineConfig } = require('eslint-define-config');

const off = 'off';
const error = 'error';

module.exports = defineConfig({
    extends: [
        '@yutengjing/eslint-config-basic',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts', '.d.ts'],
            },
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    parserOptions: {
        ecmaVersion: 'latest',
    },
    overrides: [
        // because plugin:@typescript-eslint/recommended override the parser
        // the parser of yml, json is set to @typescript-eslint/parser
        ...basic.overrides,
        {
            files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
            rules: {
                'no-useless-constructor': off,
                'jsdoc/require-param-type': off,
                'jsdoc/require-returns-check': off,
                'jsdoc/require-returns-type': off,

                // seems will cause error whe lint json if put in rules
                '@typescript-eslint/consistent-type-imports': [
                    error,
                    { prefer: 'type-imports', disallowTypeAnnotations: false },
                ],
            },
        },
    ],

    rules: {
        // TS
        '@typescript-eslint/array-type': [error, { default: 'array-simple' }],
        '@typescript-eslint/ban-ts-comment': [error, { 'ts-ignore': 'allow-with-description' }],
        '@typescript-eslint/consistent-type-definitions': [error, 'interface'],
        '@typescript-eslint/prefer-ts-expect-error': error,

        // Override JS
        '@typescript-eslint/no-unused-vars': off,
        '@typescript-eslint/no-redeclare': error,
        '@typescript-eslint/no-use-before-define': [
            error,
            { functions: false, classes: false, variables: true },
        ],
        '@typescript-eslint/no-dupe-class-members': error,
        '@typescript-eslint/no-loss-of-precision': error,
        '@typescript-eslint/lines-between-class-members': [
            error,
            'always',
            { exceptAfterSingleLine: true },
        ],

        // off
        '@typescript-eslint/ban-ts-ignore': off,
        '@typescript-eslint/ban-types': off,
        '@typescript-eslint/consistent-indexed-object-style': off,
        '@typescript-eslint/explicit-function-return-type': off,
        '@typescript-eslint/explicit-member-accessibility': off,
        '@typescript-eslint/explicit-module-boundary-types': off,
        '@typescript-eslint/naming-convention': off,
        '@typescript-eslint/no-empty-function': off,
        '@typescript-eslint/no-empty-interface': off,
        '@typescript-eslint/no-explicit-any': off,
        '@typescript-eslint/no-namespace': off,
        '@typescript-eslint/no-non-null-assertion': off,
        '@typescript-eslint/parameter-properties': off,
        '@typescript-eslint/triple-slash-reference': off,
    },
});
