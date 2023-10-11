# no-missing-remove-event-listener

禁止没有移除注册的监听器

## Failed

```javascript
yyy.$on('xxx', () => {});
```

## Pass

```javascript
const handleXxx = () => {};

yyy.$on('xxx', handleXxx);

onBeforeUnmount(() => {
  yyy.$off('xxx', handleXxx);
});
```
