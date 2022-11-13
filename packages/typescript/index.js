const basic = require('@yutengjing/eslint-config-basic');

const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        '@yutengjing/eslint-config-basic',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    settings: {
        'import/resolver': {
            node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
        },
    },
    // because plugin:@typescript-eslint/recommended override the parser
    // the parser of yml, json is set to @typescript-eslint/parser
    overrides: basic.overrides,
    rules: {
        'import/named': OFF,

        // TS
        '@typescript-eslint/ban-ts-comment': [ERROR, { 'ts-ignore': 'allow-with-description' }],
        '@typescript-eslint/member-delimiter-style': [ERROR, { multiline: { delimiter: 'none' } }],
        '@typescript-eslint/consistent-type-imports': [
            ERROR,
            { prefer: 'type-imports', disallowTypeAnnotations: false },
        ],
        '@typescript-eslint/consistent-type-definitions': [ERROR, 'interface'],
        '@typescript-eslint/prefer-ts-expect-error': ERROR,

        // Override JS
        'no-useless-constructor': OFF,
        'no-unused-vars': OFF,
        '@typescript-eslint/no-unused-vars': [WARN, { argsIgnorePattern: '^_' }],
        'no-redeclare': OFF,
        '@typescript-eslint/no-redeclare': ERROR,
        'no-use-before-define': OFF,
        '@typescript-eslint/no-use-before-define': [
            ERROR,
            { functions: false, classes: false, variables: true },
        ],
        'no-dupe-class-members': OFF,
        '@typescript-eslint/no-dupe-class-members': ERROR,
        'no-loss-of-precision': OFF,
        '@typescript-eslint/no-loss-of-precision': ERROR,
        'lines-between-class-members': OFF,
        '@typescript-eslint/lines-between-class-members': [
            ERROR,
            'always',
            { exceptAfterSingleLine: true },
        ],

        // The following rule overrides require a parser service, aka. require a `typescript.json` path.
        // This needs to be done individually for each project, and it slows down linting significantly.
        // 'no-throw-literal': OFF,
        // '@typescript-eslint/no-throw-literal': ERROR,
        // 'no-implied-eval': OFF,
        // '@typescript-eslint/no-implied-eval': ERROR,
        // 'dot-notation': OFF,
        // '@typescript-eslint/dot-notation': [ERROR, { allowKeywords: true }],
        // '@typescript-eslint/no-floating-promises': ERROR,
        // '@typescript-eslint/no-misused-promises': ERROR,

        // off
        '@typescript-eslint/consistent-indexed-object-style': OFF,
        '@typescript-eslint/naming-convention': OFF,
        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/explicit-member-accessibility': OFF,
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/parameter-properties': OFF,
        '@typescript-eslint/no-empty-interface': OFF,
        '@typescript-eslint/ban-ts-ignore': OFF,
        '@typescript-eslint/no-empty-function': OFF,
        '@typescript-eslint/no-non-null-assertion': OFF,
        '@typescript-eslint/explicit-module-boundary-types': OFF,
        '@typescript-eslint/ban-types': OFF,
        '@typescript-eslint/no-namespace': OFF,
        '@typescript-eslint/triple-slash-reference': OFF,
    },
};
