# no-missing-script

检测是缺失某些 npm scripts

## Failed

当 `.eslintrc.js` 配置了：

```javascript
module.exports = {
  overrides: [
    {
      files: ['apps/*/package.json'],
      rules: {
        'design/no-missing-script': [
          error,
          {
            scriptNames: ['check-type:app'],
            isTsProject: true,
            message: '请补充 script："check-type:app": "vue-tsc --noEmit"',
          },
        ],
      },
    },
  ],
};
```

对于下面的 `apps/design/package.json` ：

```json
{
  "scripts": {
    "dev": "vite",
    "build:app": "cross-env NODE_OPTIONS=--max-old-space-size=8192 vite build",
    "build:analyze": "cross-env ANALYZE=true pnpm build:app",
    "preview": "vite preview",
    "release": "pnpm build:app"
  }
}
```

会报错：

> 请补充 script："check-type:app": "vue-tsc --noEmit"

## Pass

```json
{
  "scripts": {
    "dev": "vite",
    "build:app": "cross-env NODE_OPTIONS=--max-old-space-size=8192 vite build",
    "build:analyze": "cross-env ANALYZE=true pnpm build:app",
    "preview": "vite preview",
    "check-type:app": "vue-tsc --noEmit",
    "release": "pnpm build:app"
  }
}
```
