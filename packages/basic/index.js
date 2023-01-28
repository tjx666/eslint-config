const off = 'off';
const warn = 'warn';
const error = 'error';

/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        'plugin:import/recommended',
        'plugin:promise/recommended',
        'standard',
        'plugin:security/recommended',
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
                    error,
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
                '@typescript-eslint/no-var-requires': off,
            },
        },
        {
            files: ['scripts/**/*.*', 'cli.*'],
            rules: {
                'no-console': off,
            },
        },
        {
            files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
            rules: {
                'no-unused-expressions': off,
                'no-only-tests/no-only-tests': error,
            },
        },
        {
            // Code blocks in markdown file
            files: ['**/*.md/*.*'],
            rules: {
                '@typescript-eslint/no-redeclare': off,
                '@typescript-eslint/no-unused-vars': off,
                '@typescript-eslint/no-use-before-define': off,
                '@typescript-eslint/no-var-requires': off,
                '@typescript-eslint/comma-dangle': off,
                'import/no-unresolved': off,
                'no-alert': off,
                'no-console': off,
                'no-restricted-imports': off,
                'no-undef': off,
                'no-unused-expressions': off,
                'no-unused-vars': off,
            },
        },
    ],
    rules: {
        // import
        'import/namespace': off,
        'import/newline-after-import': error,
        'import/no-absolute-path': off,
        'import/no-mutable-exports': error,
        'import/no-named-as-default-member': off,
        'import/no-named-as-default': off,
        'import/no-unresolved': off,
        'import/order': [
            error,
            {
                'alphabetize': { order: 'asc', caseInsensitive: true },
                'groups': ['builtin', 'external', ['parent', 'sibling', 'index']],
                'newlines-between': 'always',
            },
        ],

        // Common
        'camelcase': off,
        'no-cond-assign': [error, 'always'],
        'no-constant-condition': warn,
        'no-debugger': error,
        'no-param-reassign': off,
        'no-restricted-syntax': [error, 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
        'no-return-await': off,

        // unused-imports
        'no-unused-vars': off,
        'unused-imports/no-unused-imports': error,
        'unused-imports/no-unused-vars': [
            error,
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],

        // es6
        'no-var': error,
        'prefer-const': [error, { destructuring: 'all' }],
        'quotes': [error, 'single', { avoidEscape: true, allowTemplateLiterals: false }],

        'prefer-arrow-callback': [
            error,
            {
                allowNamedFunctions: false,
                allowUnboundThis: true,
            },
        ],
        'object-shorthand': [
            error,
            'always',
            {
                ignoreConstructors: false,
                avoidQuotes: true,
            },
        ],
        'prefer-exponentiation-operator': error,
        'prefer-rest-params': error,
        'prefer-spread': error,
        'prefer-template': error,

        // best-practice
        'array-callback-return': error,
        'block-scoped-var': error,
        'complexity': [off, 11],
        'consistent-return': off,
        'eqeqeq': [error, 'smart'],
        'no-alert': warn,
        'no-case-declarations': error,
        'no-multi-spaces': error,
        'no-multi-str': error,
        'no-return-assign': off,
        'no-use-before-define': [error, { functions: false, classes: false, variables: true }],
        'no-useless-escape': off,
        'no-void': error,
        'no-with': error,
        'operator-linebreak': [error, 'before'],
        'require-await': off,
        'vars-on-top': error,

        // nodejs
        'n/no-callback-literal': off,

        // promise
        'promise/catch-or-return': off,
        'promise/always-return': off,

        // jsdoc
        'jsdoc/check-types': off,
        'jsdoc/require-jsdoc': off,
        'jsdoc/require-param': off,
        'jsdoc/require-returns': off,
        'jsdoc/require-returns-description': off,
        'jsdoc/require-param-description': off,
        'jsdoc/check-line-alignment': [warn, 'never'],

        // unicorn
        'unicorn/consistent-destructuring': off,
        'unicorn/consistent-function-scoping': off,
        'unicorn/filename-case': off,
        'unicorn/import-style': off,
        'unicorn/no-array-callback-reference': off,
        'unicorn/no-array-for-each': off,
        'unicorn/no-array-reduce': off,
        'unicorn/no-await-expression-member': off,
        'unicorn/no-negated-condition': off,
        'unicorn/no-null': off,
        // auto fix doesn't support groupLength: 4
        'unicorn/numeric-separators-style': off,
        'unicorn/prefer-export-from': [error, { ignoreUsedVariables: true }],
        'unicorn/prefer-module': off,
        'unicorn/prefer-spread': off,
        'unicorn/prefer-ternary': off,
        'unicorn/prefer-top-level-await': off,
        'unicorn/prevent-abbreviations': off,
        'unicorn/switch-case-braces': off,

        // comments
        'eslint-comments/disable-enable-pair': off,

        // yml
        'yml/no-empty-document': off,
    },
};
