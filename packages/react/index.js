// @ts-check

const { defineConfig } = require('eslint-define-config');

const off = 'off';
const error = 'error';

module.exports = defineConfig({
    plugins: ['react-refresh'],
    extends: [
        '@yutengjing/eslint-config-typescript',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:css/recommended',
        'plugin:@eslint-react/recommended-legacy',
        'prettier',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react-refresh/only-export-components': 'warn',
        'react/jsx-no-leaked-render': error,
        'react/react-in-jsx-scope': off,
        'react/self-closing-comp': [
            error,
            {
                component: true,
                html: false,
            },
        ],

        '@eslint-react/naming-convention/component-name': [error, 'PascalCase'],
        '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': off,
        '@eslint-react/dom/no-missing-iframe-sandbox': off,
    },
});
