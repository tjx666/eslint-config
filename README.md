# @yutengjing/eslint-config

![npm (scoped)](https://img.shields.io/npm/v/@yutengjing/eslint-config-react) ![test](https://github.com/tjx666/eslint-config/actions/workflows/test.yml/badge.svg)

## Usage

### Install

```bash
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
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Thanks

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
