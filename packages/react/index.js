const OFF = 'off';
const WARN = 'warn';

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
        'react/react-in-jsx-scope': OFF,
        'react/self-closing-comp': [
            WARN,
            {
                component: true,
                html: true,
            },
        ],
    },
};
