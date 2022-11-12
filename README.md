# @yutengjing/eslint-config

[![npm](https://img.shields.io/npm/v/@yutengjing/eslint-config?color=a1b858&label=)](https://npmjs.com/package/@yutengjing/eslint-config)

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
