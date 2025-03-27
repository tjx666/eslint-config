// @ts-check

import vueParser from 'vue-eslint-parser';

import * as tsParser from '@typescript-eslint/parser';
import eslintConfigTypescript, { eslintConfigPrettier } from '@yutengjing/eslint-config-typescript';
import * as cssPlugin from 'eslint-plugin-css';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

const off = 'off';
const warn = 'warn';
const error = 'error';

export default tseslint.config(
    eslintConfigTypescript,
    ...pluginVue.configs['flat/recommended'],
    cssPlugin.configs['flat/recommended'],

    {
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

            'vue/block-order': [
                error,
                {
                    order: ['script', 'template', 'style'],
                },
            ],
        },
    },

    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
            },
        },
        rules: {
            'no-undef': off,
            'no-unused-vars': off,

            '@typescript-eslint/no-unused-vars': off,
        },
    },

    eslintConfigPrettier,
);
