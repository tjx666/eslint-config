import { defineConfig } from 'eslint/config';
import eslintConfigVue from '@yutengjing/eslint-config-vue';

export default defineConfig([
    eslintConfigVue,
    {
        rules: {
            '@typescript-eslint/no-require-imports': 0,
        },
    },
]);
