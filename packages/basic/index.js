/**
 * @typedef {import('eslint').Linter.Config} ESlintConfig
 */

const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

/** @type {ESlintConfig} */
module.exports = {
    extends: [
        'standard',
        'plugin:eslint-comments/recommended',
        'plugin:unicorn/recommended',
        'plugin:jsonc/recommended-with-jsonc',
        'plugin:yml/standard',
        'plugin:markdown/recommended',
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
    ],
    plugins: ['html', 'no-only-tests'],
    settings: {
        'import/resolver': {
            node: { extensions: ['.js', '.mjs'] },
        },
    },
    overrides: [
        {
            files: ['*.json', '*.json5'],
            parser: 'jsonc-eslint-parser',
            rules: {
                'jsonc/array-bracket-spacing': [ERROR, 'never'],
                'jsonc/comma-dangle': [ERROR, 'never'],
                'jsonc/comma-style': [ERROR, 'last'],
                'jsonc/indent': [ERROR, 2],
                'jsonc/key-spacing': [ERROR, { beforeColon: false, afterColon: true }],
                'jsonc/no-octal-escape': ERROR,
                'jsonc/object-curly-newline': [ERROR, { multiline: true, consistent: true }],
                'jsonc/object-curly-spacing': [ERROR, 'always'],
                'jsonc/object-property-newline': [ERROR, { allowMultiplePropertiesPerLine: true }],
            },
        },
        {
            files: ['*.yaml', '*.yml'],
            parser: 'yaml-eslint-parser',
            rules: {
                'spaced-comment': OFF,
            },
        },
        {
            files: ['package.json'],
            parser: 'jsonc-eslint-parser',
            rules: {
                'jsonc/sort-keys': [
                    ERROR,
                    {
                        pathPattern: '^$',
                        order: [
                            'publisher',
                            'name',
                            'displayName',
                            'type',
                            'version',
                            'private',
                            'packageManager',
                            'description',
                            'author',
                            'license',
                            'funding',
                            'homepage',
                            'repository',
                            'bugs',
                            'keywords',
                            'categories',
                            'sideEffects',
                            'exports',
                            'main',
                            'module',
                            'unpkg',
                            'jsdelivr',
                            'types',
                            'typesVersions',
                            'bin',
                            'icon',
                            'files',
                            'engines',
                            'activationEvents',
                            'contributes',
                            'scripts',
                            'peerDependencies',
                            'peerDependenciesMeta',
                            'dependencies',
                            'optionalDependencies',
                            'devDependencies',
                            'pnpm',
                            'overrides',
                            'resolutions',
                            'husky',
                            'simple-git-hooks',
                            'lint-staged',
                            'eslintConfig',
                        ],
                    },
                    {
                        pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
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
            files: ['*.d.ts'],
            rules: {
                'import/no-duplicates': OFF,
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
        'sort-imports': OFF,
        'import/first': ERROR,
        'import/namespace': OFF,
        'import/no-absolute-path': OFF,
        'import/no-mutable-exports': ERROR,
        'import/no-named-as-default-member': OFF,
        'import/no-named-as-default': OFF,
        'import/no-unresolved': OFF,
        'import/order': ERROR,

        // Common
        semi: [ERROR, 'never'],
        curly: [ERROR, 'multi-or-nest', 'consistent'],
        quotes: [ERROR, 'single'],
        'quote-props': [ERROR, 'consistent-as-needed'],
        'no-unused-vars': WARN,
        'no-param-reassign': OFF,
        'array-bracket-spacing': [ERROR, 'never'],
        'brace-style': [ERROR, 'stroustrup', { allowSingleLine: true }],
        'block-spacing': [ERROR, 'always'],
        camelcase: OFF,
        'comma-spacing': [ERROR, { before: false, after: true }],
        'comma-style': [ERROR, 'last'],
        'comma-dangle': [ERROR, 'always-multiline'],
        'no-constant-condition': WARN,
        'no-debugger': ERROR,
        'no-console': [ERROR, { allow: [WARN, ERROR] }],
        'no-cond-assign': [ERROR, 'always'],
        'func-call-spacing': [OFF, 'never'],
        'key-spacing': [ERROR, { beforeColon: false, afterColon: true }],
        indent: [ERROR, 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
        'no-restricted-syntax': [ERROR, 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
        'object-curly-spacing': [ERROR, 'always'],
        'no-return-await': OFF,
        'space-before-function-paren': [
            ERROR,
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'no-multiple-empty-lines': [ERROR, { max: 1, maxBOF: 0, maxEOF: 1 }],

        // es6
        'no-var': ERROR,
        'prefer-const': [
            ERROR,
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: true,
            },
        ],
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
        'template-curly-spacing': ERROR,
        'arrow-parens': [ERROR, 'as-needed', { requireForBlockBody: true }],
        'generator-star-spacing': OFF,
        'spaced-comment': [
            ERROR,
            'always',
            {
                line: {
                    markers: ['/'],
                    exceptions: ['/', '#'],
                },
                block: {
                    markers: ['!'],
                    exceptions: ['*'],
                    balanced: true,
                },
            },
        ],

        // best-practice
        'array-callback-return': ERROR,
        'block-scoped-var': ERROR,
        'consistent-return': OFF,
        complexity: [OFF, 11],
        eqeqeq: [ERROR, 'smart'],
        'no-alert': WARN,
        'no-case-declarations': ERROR,
        'no-multi-spaces': ERROR,
        'no-multi-str': ERROR,
        'no-with': ERROR,
        'no-void': ERROR,
        'no-useless-escape': OFF,
        'vars-on-top': ERROR,
        'require-await': OFF,
        'no-return-assign': OFF,
        'operator-linebreak': [ERROR, 'before'],
        'no-use-before-define': [ERROR, { functions: false, classes: false, variables: true }],

        // comments
        'eslint-comments/disable-enable-pair': OFF,

        // nodejs
        'n/no-callback-literal': OFF,

        // yml
        'yml/quotes': [ERROR, { prefer: 'single', avoidEscape: false }],
        'yml/no-empty-document': OFF,
    },
};
