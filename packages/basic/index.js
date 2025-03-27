// @ts-check

import { builtinModules } from 'node:module';

import js from '@eslint/js';
// import markdown from '@eslint/markdown';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintPluginYutengjing from '@yutengjing/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import html from 'eslint-plugin-html';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import jsonc from 'eslint-plugin-jsonc';
import nodePlugin from 'eslint-plugin-n';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import * as nodeDependenciesPlugin from 'eslint-plugin-node-dependencies';
import pluginPromise from 'eslint-plugin-promise';
import * as regexpPlugin from 'eslint-plugin-regexp';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginYml from 'eslint-plugin-yml';
import globals from 'globals';
import * as jsonParser from 'jsonc-eslint-parser';
import * as yamlParser from 'yaml-eslint-parser';

const off = 'off';
const warn = 'warn';
const error = 'error';

const lastConfig = defineConfig([
    {
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 'latest',
            },
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.es2025,
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
            reportUnusedInlineConfigs: 'error',
        },
        rules: {
            // common
            'camelcase': off,
            'no-await-in-loop': error,
            'no-cond-assign': [error, 'always'],
            'no-constant-condition': warn,
            'no-debugger': error,
            'no-param-reassign': off,
            'no-restricted-syntax': [
                error,
                'DebuggerStatement',
                'LabeledStatement',
                'WithStatement',
            ],
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
        },
    },
    globalIgnores([
        '**/*.min.*',
        '**/*.d.ts',
        '**/LICENSE*',
        '**/package-lock.json',
        '**/pnpm-lock.yaml',
        '**/yarn.lock',
        '**/dist/',
        '**/out/',
        '**/output/',
        '**/coverage/',
        '**/public/',
        '**/temp/',
        '**/__snapshots__/',
        '**/.vscode-test/',
        '**/.vitepress/cache/',
        '!**/.github/',
        '!**/.vitepress/',
        '!**/.vscode/',
    ]),
]);

export const languagesConfig = defineConfig([
    {
        files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
        languageOptions: {
            parser: jsonParser,
        },
    },
    {
        files: ['**/*.yaml', '**/*.yml'],
        languageOptions: {
            parser: yamlParser,
        },
    },
    // ...markdown.configs.recommended,
]);

export default defineConfig([
    js.configs.recommended,

    // import
    eslintPluginImportX.flatConfigs.recommended,
    {
        settings: {
            'import-x/resolver': {
                node: { extensions: ['.js', '.mjs', '.cjs'] },
            },
        },
        rules: {
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
        },
    },

    // eslint-comments
    comments.recommended,
    {
        rules: {
            'eslint-comments/disable-enable-pair': off,
        },
    },

    // jsdoc
    jsdoc.configs['flat/recommended'],
    {
        rules: {
            'jsdoc/check-types': off,
            'jsdoc/require-jsdoc': off,
            'jsdoc/require-param': off,
            'jsdoc/require-returns': off,
            'jsdoc/require-returns-description': off,
            'jsdoc/require-param-description': off,
            'jsdoc/check-line-alignment': [warn, 'never'],
            'jsdoc/tag-lines': off,
        },
    },

    // node
    ...nodeDependenciesPlugin.configs['flat/recommended'],
    {
        files: ['**/scripts/**/*.*'],
        rules: {
            'no-console': off,
        },
    },
    {
        plugins: {
            n: nodePlugin,
        },
        rules: {
            'n/handle-callback-err': [error, '^(err|error)$'],
            'n/no-deprecated-api': error,
            'n/no-exports-assign': error,
            'n/no-new-require': error,
            'n/no-path-concat': error,
            'n/prefer-global/buffer': [error, 'never'],
            'n/prefer-global/process': [error, 'never'],
            'n/process-exit-as-throw': error,
            'n/no-callback-literal': off,
        },
    },

    // promise
    pluginPromise.configs['flat/recommended'],
    {
        rules: {
            'promise/catch-or-return': off,
            'promise/always-return': off,
        },
    },

    // regexp
    regexpPlugin.configs['flat/recommended'],

    // json
    ...jsonc.configs['flat/recommended-with-jsonc'],
    {
        files: ['**/package.json'],
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

    // yaml
    ...eslintPluginYml.configs['flat/recommended'],
    {
        files: ['**/*.yaml', '**/*.yml'],
        rules: {
            'yml/no-empty-document': off,
        },
    },

    // markdown
    {
        // Code blocks in markdown file
        files: ['**/*.md/*.*'],
        rules: {
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

    // html
    {
        files: ['**/*.html'],
        plugins: { html },
    },

    // import order
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js#L69
            'simple-import-sort/imports': [
                error,
                {
                    groups: [
                        // Side effect imports.
                        [String.raw`^\u0000`],
                        // Node.js builtins
                        [
                            '^node:',
                            `^(${builtinModules
                                .filter((mod) => mod !== 'constants')
                                .join('|')})(/.*|$)`,
                        ],
                        // framework
                        ['^astro', '^react', '^vue'],
                        // Packages.
                        // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                        [String.raw`^@?\w`],
                        ['^@(assets|config|components|content|layouts|pages|styles|utils|)(/.*|$)'],
                        // Absolute imports and other imports such as Vue-style `@/foo`.
                        // Anything not matched in another group.
                        ['^'],
                        // Relative imports.
                        // Anything that starts with a dot.
                        [String.raw`^\.`],
                    ],
                },
            ],
            'simple-import-sort/exports': error,
        },
    },

    // unicorn
    {
        languageOptions: {
            globals: globals.builtin,
        },
        plugins: {
            unicorn: eslintPluginUnicorn,
        },
        rules: {
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
        },
    },

    // unused imports
    {
        plugins: {
            'unused-imports': unusedImports,
        },
        rules: {
            'no-unused-vars': off,
            'unused-imports/no-unused-imports': error,
            'unused-imports/no-unused-vars': [
                error,
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },

    // test
    {
        plugins: {
            'no-only-tests': noOnlyTests,
        },
    },
    {
        files: ['**/*.test.ts', '**/*.test.js', '**/*.spec.ts', '**/*.spec.js'],
        rules: {
            'no-unused-expressions': off,
            'no-only-tests/no-only-tests': error,
        },
    },

    // yutengjing
    {
        plugins: {
            '@yutengjing': eslintPluginYutengjing,
        },
        rules: {
            '@yutengjing/comment-autocorrect': error,
            '@yutengjing/no-declare-implicit-any-var': error,
            '@yutengjing/no-vue-filename-index': error,
            '@yutengjing/prefer-jsdoc': error,
        },
    },

    lastConfig,
]);

export { default as eslintConfigPrettier } from 'eslint-config-prettier/flat';
