// @ts-check

import eslintConfigBasic, {
    languagesConfig,
    eslintConfigPrettier,
} from '@yutengjing/eslint-config-basic';
import tseslint from 'typescript-eslint';
import eslintPluginImportX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

const off = 'off';
const error = 'error';

export { eslintConfigPrettier };

export default tseslint.config(
    eslintConfigBasic,
    tseslint.configs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    languagesConfig,
    {
        settings: {
            'import-x/resolver': {
                node: {
                    extensions: [
                        '.js',
                        '.jsx',
                        '.mjs',
                        '.cjs',
                        '.ts',
                        '.tsx',
                        '.mts',
                        '.cts',
                        '.d.ts',
                    ],
                },
            },
            'import-x/resolver-next': [
                createTypeScriptImportResolver({
                    alwaysTryTypes: true,
                }),
            ],
        },
    },

    {
        files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
        rules: {
            'import-x/no-unresolved': off,
            'import-x/default': off,
            'no-useless-constructor': off,
            'jsdoc/require-param-type': off,
            'jsdoc/require-returns-check': off,
            'jsdoc/require-returns-type': off,

            // seems will cause error whe lint json if put in rules
            '@typescript-eslint/consistent-type-imports': [
                error,
                {
                    prefer: 'type-imports',
                    fixStyle: 'separate-type-imports',
                },
            ],
        },
    },

    {
        files: ['*.js', '*.cjs'],
        rules: {
            '@typescript-eslint/no-var-requires': off,
        },
    },

    {
        // Code blocks in markdown file
        files: ['**/*.md/*.*'],
        rules: {
            '@typescript-eslint/no-redeclare': off,
            '@typescript-eslint/no-unused-vars': off,
            '@typescript-eslint/no-use-before-define': off,
            '@typescript-eslint/no-var-requires': off,
            '@typescript-eslint/comma-dangle': off,
        },
    },

    {
        rules: {
            // TS
            '@typescript-eslint/array-type': [error, { default: 'array-simple' }],
            '@typescript-eslint/ban-ts-comment': [error, { 'ts-ignore': 'allow-with-description' }],
            '@typescript-eslint/consistent-type-definitions': [error, 'interface'],
            '@typescript-eslint/prefer-ts-expect-error': error,

            // Override JS
            '@typescript-eslint/no-unused-vars': off,
            '@typescript-eslint/no-redeclare': error,
            '@typescript-eslint/no-use-before-define': [
                error,
                { functions: false, classes: false, variables: true },
            ],
            '@typescript-eslint/no-dupe-class-members': error,
            '@typescript-eslint/no-loss-of-precision': error,

            // off
            '@typescript-eslint/ban-ts-ignore': off,
            '@typescript-eslint/ban-types': off,
            '@typescript-eslint/consistent-indexed-object-style': off,
            '@typescript-eslint/explicit-function-return-type': off,
            '@typescript-eslint/explicit-member-accessibility': off,
            '@typescript-eslint/explicit-module-boundary-types': off,
            '@typescript-eslint/naming-convention': off,
            '@typescript-eslint/no-empty-function': off,
            '@typescript-eslint/no-empty-interface': off,
            '@typescript-eslint/no-explicit-any': off,
            '@typescript-eslint/no-namespace': off,
            '@typescript-eslint/no-non-null-assertion': off,
            '@typescript-eslint/parameter-properties': off,
            '@typescript-eslint/triple-slash-reference': off,
        },
    },

    eslintConfigPrettier,
);
