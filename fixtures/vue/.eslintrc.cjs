const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    root: true,
    extends: '@yutengjing/eslint-config-vue',
    rules: {
        '@typescript-eslint/no-require-imports': 0,
    },
});
