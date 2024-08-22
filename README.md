# @yutengjing/eslint-config

[![npm (scoped)](https://img.shields.io/npm/v/@yutengjing/eslint-config-basic)](https://www.npmjs.com/package/@yutengjing/eslint-config-basic) [![npm](https://img.shields.io/npm/dm/@yutengjing/eslint-config-basic)](https://www.npmjs.com/package/@yutengjing/eslint-config-basic) [![test](https://github.com/tjx666/eslint-config/actions/workflows/test.yml/badge.svg)](https://github.com/tjx666/eslint-config/actions/workflows/test.yml)

## Usage

### Install

`eslint` is peerDependencies, make sure you had already installed `eslint`

```shell
# pnpm
pnpm add -D @yutengjing/eslint-config-typescript

# npm
npm add -D @yutengjing/eslint-config-typescript

# yarn
yarn add -D @yutengjing/eslint-config-typescript

# bun
bun add -d @yutengjing/eslint-config-typescript
```

### Integrate

add this preset to `.eslintrc` or `.eslintrc.js`

```json
{
  "extends": "@yutengjing/eslint-config-typescript"
}
```

or you can simply add it to package.json:

```json
{
  "eslintConfig": {
    "extends": "@yutengjing/eslint-config-typescript"
  }
}
```

> You don't need `.eslintignore` normally as it has been provided by the preset.

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### Config VS Code auto fix

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and create `.vscode/settings.json`

```json
{
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "json",
    "json5",
    "jsonc",
    "markdown",
    "yml",
    "yaml",
    "html"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## @yutengjing/eslint-plugin

Some useful personal eslint rules:

- [@yutengjing/comment-autocorrect](./packages/eslint-plugin/rules/comment-autocorrect.js)
- [@yutengjing/no-missing-script](./packages/eslint-plugin/rules/no-missing-script.js)
- [@yutengjing/format-mui-sx-selector.js](./packages/eslint-plugin/rules/format-mui-sx-selector.js)
- [@yutengjing/no-mui-sx-selector-missing-dot](./packages/eslint-plugin/rules/no-mui-sx-selector-missing-dot.js)
- [@yutengjing/no-reference-deps](./packages/eslint-plugin/rules/no-reference-deps.js)
- [@yutengjing/matching-remove-event-listener.js](./packages/eslint-plugin/rules/matching-remove-event-listener.js)
- [@yutengjing/no-uppercase-module-path](./packages/eslint-plugin/rules/no-uppercase-module-path.js)
- [@yutengjing/no-declare-implicit-any-var.js](./packages/eslint-plugin/rules/no-declare-implicit-any-var.js)
- [@yutengjing/no-vue-filename-index](./packages/eslint-plugin/rules/no-vue-filename-index.js)
- [@yutengjing/no-inline-function-event-listener](./packages/eslint-plugin/rules/no-inline-function-event-listener.js)
- [@yutengjing/prefer-jsdoc](./packages/eslint-plugin/rules/prefer-jsdoc.js)
- [@yutengjing/no-invalid-mui-breakpoints.js](./packages/eslint-plugin/rules/no-invalid-mui-breakpoints.js)
- [@yutengjing/no-missing-remove-event-listener](./packages/eslint-plugin/rules/no-missing-remove-event-listener.js)
- [@yutengjing/no-relative-import](./packages/eslint-plugin/rules/no-relative-import.js)

check the [source code](./packages/eslint-plugin/rules) or [rule docs](./packages/eslint-plugin/docs/rules/) for details.

## Thanks

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## Related

- [@yutengjing/stylelint-config](https://github.com/tjx666/prettier-config/tree/main)
- [@yutengjing/prettier-config](https://github.com/tjx666/prettier-config/tree/main)
- [@yutengjing/tsconfig](https://github.com/tjx666/tsconfig/tree/main)
