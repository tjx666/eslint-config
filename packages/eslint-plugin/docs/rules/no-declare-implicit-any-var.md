# 禁止隐式声明类型为 any 的变量

## Fail

```typescript
let resp;
try {
  resp = get();
} catch (error) {
  return null;
}
```

## Pass

```typescript
let resp: any;
try {
  resp = get();
} catch (error) {
  return null;
}
```

## Reference

- [--noImplicitAny error not reported for variable declaration](https://github.com/microsoft/TypeScript/issues/30899)
- [how to implement rule only lint ts script in vue file?](https://github.com/vuejs/eslint-plugin-vue/issues/2257)
