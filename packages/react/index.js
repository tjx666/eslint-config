import eslintReact from '@eslint-react/eslint-plugin';
import eslintConfigTypescript, { eslintConfigPrettier } from '@yutengjing/eslint-config-typescript';
import * as cssPlugin from 'eslint-plugin-css';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import * as reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslintConfigTypescript,
    cssPlugin.configs['flat/recommended'],
    jsxA11y.flatConfigs.recommended,
    reactPlugin.configs.flat.recommended, // This is not a plugin object, but a shareable config object
    reactPlugin.configs.flat['jsx-runtime'], // Add this if you are using React 17+
    reactHooks.configs['recommended-latest'],
    reactRefresh.configs.recommended,
    eslintReact.configs['recommended-typescript'],

    {
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'react-refresh/only-export-components': 'warn',
            'react/jsx-no-leaked-render': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/self-closing-comp': [
                'error',
                {
                    component: true,
                    html: false,
                },
            ],

            '@eslint-react/naming-convention/component-name': ['error', 'PascalCase'],
            '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
            '@eslint-react/dom/no-missing-iframe-sandbox': 'off',
        },
    },

    eslintConfigPrettier,
);
