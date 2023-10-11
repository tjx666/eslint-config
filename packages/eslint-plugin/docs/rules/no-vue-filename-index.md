# .vue 文件不允许命名为 index.vue

vue 文件名如果是 index.vue，那么在 vue devtools 中显示的组件名就是 `Index`

不支持自动修复。

## Fail

```txt
/path/to/button/index.vue
```

## Pass

```txt
/path/to/button/button.vue
```

## 参考链接

- https://github.com/vuejs/vue-loader/issues/1924
- https://github.com/vuejs/core/issues/7156
