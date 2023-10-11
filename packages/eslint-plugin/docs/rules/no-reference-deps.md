# 禁止某些包依赖另一些包

例如当配置为：

```javascript
{
    'design/no-reference-deps': [
            error,
            {
                packagesPattern: '@xxx/[\\w-]+',
                referencedPackagesPattern: '@yyy/[\\w-]+',
            },
        ]
}
```

## Failed

`packages/xxx/utils/package.json`:

```json
{
  "dependencies": {
    "@yyy/ui": "workspace:*"
  }
}
```

## Pass

`packages/xxx/framework/package.json`:

```json
{
  "dependencies": {
    "@xxx/utils": "workspace:*"
  }
}
```
