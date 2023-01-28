const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        'plugin:import/recommended',
        'plugin:promise/recommended',
        'standard',
        'plugin:regexp/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:jsdoc/recommended',
        'plugin:unicorn/recommended',
        'plugin:jsonc/recommended-with-jsonc',
        'plugin:jsonc/prettier',
        'plugin:yml/standard',
        'plugin:yml/prettier',
        'plugin:markdown/recommended',
        'prettier',
    ],
    env: {
        es2022: true,
        browser: true,
        node: true,
    },
    reportUnusedDisableDirectives: true,
    ignorePatterns: [
        '*.min.*',
        '*.d.ts',
        'CHANGELOG.md',
        'dist',
        'out',
        'LICENSE*',
        'output',
        'coverage',
        'public',
        'temp',
        'package-lock.json',
        'pnpm-lock.yaml',
        'yarn.lock',
        '__snapshots__',
        '!.github',
        '!.vitepress',
        '!.vscode',
        '!.vscode-test',
    ],
    plugins: ['html', 'no-only-tests', 'unused-imports'],
    settings: {
        'import/resolver': {
            node: { extensions: ['.js', '.mjs', '.cjs'] },
        },
    },
    overrides: [
        {
            files: ['*.json', '*.json5'],
            parser: 'jsonc-eslint-parser',
        },
        {
            files: ['*.yaml', '*.yml'],
            parser: 'yaml-eslint-parser',
        },
        {
            files: ['package.json'],
            parser: 'jsonc-eslint-parser',
            rules: {
                'jsonc/sort-keys': [
                    ERROR,
                    // https://github.com/ota-meshi/eslint-plugin-jsonc/issues/208
                    {
                        pathPattern: '^scripts$',
                        order: [
                            {
                                keyPattern: 'start:',
                                order: { type: 'asc' },
                            },
                            {
                                keyPattern: 'serve:',
                                order: { type: 'asc' },
                            },
                            {
                                keyPattern: 'dev:',
                                order: { type: 'asc' },
                            },
                            {
                                keyPattern: 'build:',
                                order: { type: 'asc' },
                            },
                            {
                                keyPattern: 'test:',
                                order: { type: 'asc' },
                            },
                            {
                                keyPattern: 'lint:',
                                order: { type: 'asc' },
                            },
                            {
                                keyPattern: 'release:',
                                order: { type: 'asc' },
                            },
                        ],
                    },
                    {
                        pathPattern: '^pnpm.overrides$',
                        order: { type: 'asc' },
                    },
                    {
                        pathPattern: '^(?:dev|peer|optional|bundled|neverBuilt)?[Dd]ependencies$',
                        order: { type: 'asc' },
                    },
                    {
                        pathPattern: '^exports.*$',
                        order: ['types', 'require', 'import'],
                    },
                ],
            },
        },
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': OFF,
            },
        },
        {
            files: ['scripts/**/*.*', 'cli.*'],
            rules: {
                'no-console': OFF,
            },
        },
        {
            files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
            rules: {
                'no-unused-expressions': OFF,
                'no-only-tests/no-only-tests': ERROR,
            },
        },
        {
            // Code blocks in markdown file
            files: ['**/*.md/*.*'],
            rules: {
                '@typescript-eslint/no-redeclare': OFF,
                '@typescript-eslint/no-unused-vars': OFF,
                '@typescript-eslint/no-use-before-define': OFF,
                '@typescript-eslint/no-var-requires': OFF,
                '@typescript-eslint/comma-dangle': OFF,
                'import/no-unresolved': OFF,
                'no-alert': OFF,
                'no-console': OFF,
                'no-restricted-imports': OFF,
                'no-undef': OFF,
                'no-unused-expressions': OFF,
                'no-unused-vars': OFF,
            },
        },
    ],
    rules: {
        // import
        'import/namespace': OFF,
        'import/newline-after-import': ERROR,
        'import/no-absolute-path': OFF,
        'import/no-mutable-exports': ERROR,
        'import/no-named-as-default-member': OFF,
        'import/no-named-as-default': OFF,
        'import/no-unresolved': OFF,
        'import/order': [
            ERROR,
            {
                'alphabetize': { order: 'asc', caseInsensitive: true },
                'groups': ['builtin', 'external', ['parent', 'sibling', 'index']],
                'newlines-between': 'always',
            },
        ],

        // Common
        'camelcase': OFF,
        'no-cond-assign': [ERROR, 'always'],
        'no-constant-condition': WARN,
        'no-debugger': ERROR,
        'no-param-reassign': OFF,
        'no-restricted-syntax': [ERROR, 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
        'no-return-await': OFF,

        // unused-imports
        'no-unused-vars': OFF,
        'unused-imports/no-unused-imports': ERROR,
        'unused-imports/no-unused-vars': [
            ERROR,
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],

        // es6
        'no-var': ERROR,
        'prefer-const': [ERROR, { destructuring: 'all' }],
        'quotes': [ERROR, 'single', { avoidEscape: true, allowTemplateLiterals: false }],

        'prefer-arrow-callback': [
            ERROR,
            {
                allowNamedFunctions: false,
                allowUnboundThis: true,
            },
        ],
        'object-shorthand': [
            ERROR,
            'always',
            {
                ignoreConstructors: false,
                avoidQuotes: true,
            },
        ],
        'prefer-exponentiation-operator': ERROR,
        'prefer-rest-params': ERROR,
        'prefer-spread': ERROR,
        'prefer-template': ERROR,

        // best-practice
        'array-callback-return': ERROR,
        'block-scoped-var': ERROR,
        'complexity': [OFF, 11],
        'consistent-return': OFF,
        'eqeqeq': [ERROR, 'smart'],
        'no-alert': WARN,
        'no-case-declarations': ERROR,
        'no-multi-spaces': ERROR,
        'no-multi-str': ERROR,
        'no-return-assign': OFF,
        'no-use-before-define': [ERROR, { functions: false, classes: false, variables: true }],
        'no-useless-escape': OFF,
        'no-void': ERROR,
        'no-with': ERROR,
        'operator-linebreak': [ERROR, 'before'],
        'require-await': OFF,
        'vars-on-top': ERROR,

        // nodejs
        'n/no-callback-literal': OFF,

        // promise
        'promise/catch-or-return': OFF,
        'promise/always-return': OFF,

        // jsdoc
        'jsdoc/check-types': OFF,
        'jsdoc/require-jsdoc': OFF,
        'jsdoc/require-param': OFF,
        'jsdoc/require-returns': OFF,
        'jsdoc/require-returns-description': OFF,
        'jsdoc/require-param-description': OFF,
        'jsdoc/check-line-alignment': [ERROR, 'never'],

        // unicorn
        'unicorn/filename-case': OFF,
        'unicorn/import-style': OFF,
        'unicorn/no-array-for-each': OFF,
        'unicorn/no-array-reduce': OFF,
        'unicorn/no-await-expression-member': OFF,
        'unicorn/no-null': OFF,
        // auto fix doesn't support groupLength: 4
        'unicorn/numeric-separators-style': OFF,
        'unicorn/prefer-module': OFF,
        'unicorn/prefer-top-level-await': OFF,
        'unicorn/prevent-abbreviations': OFF,
        'unicorn/switch-case-braces': OFF,

        // comments
        'eslint-comments/disable-enable-pair': OFF,

        // yml
        'yml/no-empty-document': OFF,
    },
};
