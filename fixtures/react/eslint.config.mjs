import eslintConfigReact from '@yutengjing/eslint-config-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    eslintConfigReact,
    {
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
    },
]);
