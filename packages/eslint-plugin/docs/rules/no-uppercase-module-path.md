# 禁止模块路径大写

项目文件名使用中划线风格，如果模块路径使用了大写字母，大概率是你拼写错误了。
并且 typescript 在 MacOS 系统上对模块路径是不敏感而的在 Linux 上是敏感的，如果你把小写路径拼成大写的，就会出现本地没报错，CI 上报错的情况，

## Failed

```typescript
import mod from 'unplugin-detect-duplicated-deps/Vite';
```

## Pass

```typescript
import mod from 'unplugin-detect-duplicated-deps/vite';
```

### References

- [forceConsistentCasingInFileNames doesn't work on macos and windows when import package](https://github.com/microsoft/TypeScript/issues/54565)
