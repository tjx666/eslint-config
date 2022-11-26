const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

/** @type {import('eslint').Linter.Config} */
module.exports = {
    overrides: [
        {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
            rules: {
                'no-undef': OFF,
                'no-unused-vars': OFF,

                '@typescript-eslint/no-unused-vars': OFF,
            },
        },
    ],
    extends: ['plugin:vue/vue3-recommended', '@yutengjing/eslint-config-typescript', 'prettier'],
    settings: {
        'import/resolver': {
            node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts', '.vue'] },
        },
    },

    rules: {
        'vue/multi-word-component-names': OFF,
        'vue/no-v-html': OFF,
        'vue/prefer-import-from-vue': OFF,
        'vue/require-default-prop': OFF,
        'vue/require-prop-types': OFF,

        // reactivity transform
        'vue/no-setup-props-destructure': OFF,

        'vue/component-tags-order': [
            ERROR,
            {
                order: ['script', 'template', 'style'],
            },
        ],
        'vue/component-name-in-template-casing': [ERROR, 'PascalCase'],
        'vue/component-options-name-casing': [ERROR, 'PascalCase'],
        'vue/custom-event-name-casing': [ERROR, 'camelCase'],
        'vue/define-macros-order': [
            ERROR,
            {
                order: ['defineProps', 'defineEmits'],
            },
        ],
        'vue/html-comment-content-spacing': [
            ERROR,
            'always',
            {
                exceptions: ['-'],
            },
        ],
        'vue/no-restricted-v-bind': [ERROR, '/^v-/'],
        'vue/no-useless-v-bind': ERROR,
        'vue/no-v-text-v-html-on-component': ERROR,
        'vue/padding-line-between-blocks': [ERROR, 'always'],
        'vue/prefer-separate-static-class': ERROR,

        // extensions
        'vue/dot-notation': [ERROR, { allowKeywords: true }],
        'vue/eqeqeq': [ERROR, 'smart'],
        'vue/no-constant-condition': WARN,
        'vue/no-empty-pattern': ERROR,
        'vue/no-irregular-whitespace': ERROR,
        'vue/no-loss-of-precision': ERROR,
        'vue/no-restricted-syntax': [
            ERROR,
            'DebuggerStatement',
            'LabeledStatement',
            'WithStatement',
        ],
        'vue/no-sparse-arrays': ERROR,
        'vue/object-shorthand': [
            ERROR,
            'always',
            {
                ignoreConstructors: false,
                avoidQuotes: true,
            },
        ],
        'vue/prefer-template': ERROR,
    },
};
