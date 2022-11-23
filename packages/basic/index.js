const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        'plugin:import/recommended',
        'plugin:promise/recommended',
        'standard',
        'plugin:eslint-comments/recommended',
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
                    WARN,
                    {
                        pathPattern: '^$',
                        order: [
                            'name',
                            'displayName',
                            'type',
                            'version',
                            'private',
                            'description',
                            'packageManager',
                            'pnpm',
                            'publisher',
                            'author',
                            'license',
                            'funding',
                            'homepage',
                            'repository',
                            'bugs',
                            'keywords',
                            'categories',
                            'publishConfig',
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
                            'overrides',
                            'eslintConfig',
                            'lint-staged',
                            'husky',
                            'simple-git-hooks',
                            'scripts',
                            'resolutions',
                            'optionalDependencies',
                            'peerDependencies',
                            'peerDependenciesMeta',
                            'dependencies',
                            'devDependencies',
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
        'import/no-absolute-path': OFF,
        'import/no-mutable-exports': ERROR,
        'import/no-named-as-default-member': OFF,
        'import/no-named-as-default': OFF,
        'import/no-unresolved': OFF,
        'import/order': OFF,

        // Common
        'camelcase': OFF,
        'no-cond-assign': [ERROR, 'always'],
        'no-constant-condition': WARN,
        'no-debugger': ERROR,
        'no-param-reassign': OFF,
        'no-restricted-syntax': [ERROR, 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
        'no-return-await': OFF,
        'no-unused-vars': WARN,

        // es6
        'no-var': ERROR,
        'prefer-const': [
            WARN,
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
