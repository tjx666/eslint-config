const basic = require('@yutengjing/eslint-config-basic');

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
    overrides: basic.overrides,
    rules: {
        'jsx-quotes': ['error', 'prefer-double'],
        'react/react-in-jsx-scope': 'off',
    },
};
