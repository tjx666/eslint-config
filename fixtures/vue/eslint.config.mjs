import eslintConfigVue from '@yutengjing/eslint-config-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    eslintConfigVue,
    {
        rules: {
            '@typescript-eslint/no-require-imports': 0,
        },
    },
]);
