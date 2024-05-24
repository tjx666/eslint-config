// @ts-check

const { defineConfig } = require('eslint-define-config');

const off = 'off';
const warn = 'warn';
const error = 'error';

module.exports = defineConfig({
    extends: [
        'plugin:import-x/recommended',
        'plugin:promise/recommended',
        'plugin:regexp/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:jsdoc/recommended',
        'plugin:unicorn/recommended',
        'plugin:jsonc/recommended-with-jsonc',
        'plugin:jsonc/prettier',
        'plugin:yml/standard',
        'plugin:yml/prettier',
        'plugin:markdown/recommended-legacy',
        'plugin:node-dependencies/recommended',
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
        '.vscode-test',
        '!.github',
        '!.vitepress',
        '!.vscode',
        '**/.vitepress/cache',
    ],
    plugins: [
        'eslint-plugin-n',
        'html',
        'no-only-tests',
        'unused-imports',
        'simple-import-sort',
        '@yutengjing',
    ],
    settings: {
        'import-x/resolver': {
            node: { extensions: ['.js', '.mjs', '.cjs'] },
        },
    },
    overrides: [
        {
            files: ['*.yaml', '*.yml'],
            parser: 'yaml-eslint-parser',
        },
        {
            files: ['*.json', '*.jsonc', '*.json5'],
            parser: 'jsonc-eslint-parser',
        },
        {
            files: ['package.json'],
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
                        pathPattern: '^resolutions$',
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
            files: ['*.js', '*.cjs'],
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
                'import-x/no-unresolved': off,
                'no-alert': off,
                'no-console': off,
                'no-restricted-imports': off,
                'no-undef': off,
                'no-unused-expressions': off,
                'no-unused-vars': off,
                'unused-imports/no-unused-vars': off,
            },
        },
    ],
    rules: {
        '@yutengjing/comment-autocorrect': error,
        '@yutengjing/no-declare-implicit-any-var': error,
        '@yutengjing/no-vue-filename-index': error,
        '@yutengjing/prefer-jsdoc': error,

        'n/handle-callback-err': [error, '^(err|error)$'],
        'n/no-deprecated-api': error,
        'n/no-exports-assign': error,
        'n/no-new-require': error,
        'n/no-path-concat': error,
        'n/prefer-global/buffer': [error, 'never'],
        'n/prefer-global/process': [error, 'never'],
        'n/process-exit-as-throw': error,

        // import
        'import-x/consistent-type-specifier-style': [error, 'prefer-top-level'],
        'import-x/namespace': off,
        'import-x/newline-after-import': error,
        'import-x/no-absolute-path': off,
        'import-x/no-duplicates': error,
        'import-x/no-mutable-exports': error,
        'import-x/no-named-as-default-member': off,
        'import-x/no-named-as-default': off,
        'import-x/no-unresolved': error,
        'import-x/order': off,

        // import order
        // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js#L69
        'simple-import-sort/imports': [
            error,
            {
                groups: [
                    // Side effect imports.
                    ['^\\u0000'],
                    // Node.js builtins
                    [
                        '^node:',
                        `^(${require('node:module')
                            .builtinModules.filter((mod) => mod !== 'constants')
                            .join('|')})(/.*|$)`,
                    ],
                    // framework
                    ['^astro', '^react', '^vue'],
                    // Packages.
                    // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                    ['^@?\\w'],
                    ['^@(assets|config|components|content|layouts|pages|styles|utils|)(/.*|$)'],
                    // Absolute imports and other imports such as Vue-style `@/foo`.
                    // Anything not matched in another group.
                    ['^'],
                    // Relative imports.
                    // Anything that starts with a dot.
                    ['^\\.'],
                ],
            },
        ],
        'simple-import-sort/exports': error,

        // Common
        'camelcase': off,
        'no-await-in-loop': error,
        'no-cond-assign': [error, 'always'],
        'no-constant-condition': warn,
        'no-debugger': error,
        'no-param-reassign': off,
        'no-restricted-syntax': [error, 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
        'no-return-await': off,
        // overridden by eslint-config-standard
        'no-unused-expressions': [
            error,
            {
                allowShortCircuit: false,
                allowTernary: false,
                allowTaggedTemplates: false,
            },
        ],

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
        'prefer-destructuring': [error, { array: false }],
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
        'jsdoc/tag-lines': off,

        // unicorn
        // use eslint-plugin-regexp instead
        'unicorn/better-regex': off,
        'unicorn/consistent-destructuring': off,
        'unicorn/consistent-function-scoping': off,
        'unicorn/filename-case': off,
        'unicorn/import-style': off,
        // for cross runtime like bun
        'unicorn/prefer-node-protocol': off,
        // use eslint-comments/no-unlimited-disable instead
        'unicorn/no-abusive-eslint-disable': off,
        'unicorn/no-array-callback-reference': off,
        'unicorn/no-array-for-each': off,
        'unicorn/no-array-push-push': off,
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
});
