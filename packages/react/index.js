// @ts-check

const off = 'off';
const error = 'error';

/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        '@yutengjing/eslint-config-typescript',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:css/recommended',
        'prettier',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react/jsx-no-leaked-render': error,
        'react/react-in-jsx-scope': off,
        'react/self-closing-comp': [
            error,
            {
                component: true,
                html: false,
            },
        ],
    },
};
