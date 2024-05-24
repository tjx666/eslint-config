// @ts-check

const { defineConfig } = require('eslint-define-config');

const off = 'off';
const warn = 'warn';
const error = 'error';

module.exports = defineConfig({
    overrides: [
        {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
            env: {
                'vue/setup-compiler-macros': true,
            },
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
            rules: {
                'no-undef': off,
                'no-unused-vars': off,

                '@typescript-eslint/no-unused-vars': off,
            },
        },
    ],
    extends: [
        'plugin:vue/vue3-recommended',
        '@yutengjing/eslint-config-typescript',
        'plugin:css/recommended',
        'prettier',
    ],
    settings: {
        'import-x/resolver': {
            node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts', '.vue'] },
        },
    },

    rules: {
        'vue/multi-word-component-names': off,
        'vue/no-v-html': off,
        'vue/prefer-import-from-vue': off,
        'vue/require-default-prop': off,
        'vue/require-prop-types': off,
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'any',
                    component: 'always',
                },
                svg: 'any',
                math: 'any',
            },
        ],

        // reactivity transform
        'vue/no-setup-props-destructure': off,

        'vue/component-tags-order': [
            error,
            {
                order: ['script', 'template', 'style'],
            },
        ],
        'vue/component-name-in-template-casing': [error, 'PascalCase'],
        'vue/component-options-name-casing': [error, 'PascalCase'],
        'vue/custom-event-name-casing': [error, 'camelCase'],
        'vue/define-macros-order': [
            error,
            {
                order: ['defineProps', 'defineEmits'],
            },
        ],
        'vue/html-comment-content-spacing': [
            error,
            'always',
            {
                exceptions: ['-'],
            },
        ],
        'vue/no-restricted-v-bind': [error, '/^v-/'],
        'vue/no-useless-v-bind': error,
        'vue/no-v-text-v-html-on-component': error,
        'vue/padding-line-between-blocks': [error, 'always'],
        'vue/prefer-separate-static-class': error,

        // extensions
        'vue/dot-notation': [error, { allowKeywords: true }],
        'vue/eqeqeq': [error, 'smart'],
        'vue/no-constant-condition': warn,
        'vue/no-empty-pattern': error,
        'vue/no-irregular-whitespace': error,
        'vue/no-loss-of-precision': error,
        'vue/no-restricted-syntax': [
            error,
            'DebuggerStatement',
            'LabeledStatement',
            'WithStatement',
        ],
        'vue/no-sparse-arrays': error,
        'vue/object-shorthand': [
            error,
            'always',
            {
                ignoreConstructors: false,
                avoidQuotes: true,
            },
        ],
        'vue/prefer-template': error,
    },
});
