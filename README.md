# @yutengjing/eslint-config

[![npm (scoped)](https://img.shields.io/npm/v/@yutengjing/eslint-config-basic)](https://www.npmjs.com/package/@yutengjing/eslint-config-basic) [![npm](https://img.shields.io/npm/dm/@yutengjing/eslint-config-basic)](https://www.npmjs.com/package/@yutengjing/eslint-config-basic) [![test](https://github.com/tjx666/eslint-config/actions/workflows/test.yml/badge.svg)](https://github.com/tjx666/eslint-config/actions/workflows/test.yml)

## Usage

### Install

```sh
pnpm add -D eslint @yutengjing/eslint-config
```

### Config `.eslintrc`

---

```json
{
  "extends": "@yutengjing/eslint-config-react"
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
    "source.fixAll.eslint": true
  }
}
```

### Thanks

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
