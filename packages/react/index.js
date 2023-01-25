const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        '@yutengjing/eslint-config-typescript',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react/jsx-no-leaked-render': ERROR,
        'react/react-in-jsx-scope': OFF,
        'react/self-closing-comp': [
            ERROR,
            {
                component: true,
                html: false,
            },
        ],
    },
};
