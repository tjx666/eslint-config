import eslintConfigTypescript from '@yutengjing/eslint-config-typescript';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    eslintConfigTypescript,
    {
        ignores: ['fixtures', 'packages/eslint-plugin/docs/rules/**/*.md'],
        rules: {
            'jsdoc/no-undefined-types': 0,
            '@typescript-eslint/no-require-imports': 0,
        },
    },
]);
