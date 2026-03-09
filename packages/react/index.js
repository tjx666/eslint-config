import eslintReact from '@eslint-react/eslint-plugin';
import eslintConfigTypescript, { eslintConfigPrettier } from '@yutengjing/eslint-config-typescript';
import * as cssPlugin from 'eslint-plugin-css';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import * as reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslintConfigTypescript,
    cssPlugin.configs['flat/recommended'],
    jsxA11y.flatConfigs.recommended,
    reactHooks.configs.flat['recommended-latest'],
    reactRefresh.configs.recommended,
    eslintReact.configs['recommended-typescript'],

    {
        rules: {
            'react-refresh/only-export-components': 'warn',
            '@stylistic/jsx-self-closing-comp': [
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
    {
        files: ['**/*.{ts,tsx,mts,cts}'],
        rules: {
            '@eslint-react/no-leaked-conditional-rendering': 'error',
        },
    },

    eslintConfigPrettier,
);
