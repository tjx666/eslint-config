const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    root: true,
    extends: '@yutengjing/eslint-config-react',
    rules: {
        '@typescript-eslint/no-require-imports': 0,

        '@yutengjing/no-relative-import': [
            'error',
            {
                respectAliasOrder: true,
                onlyPathAliases: true,
            },
        ],
    },
});
