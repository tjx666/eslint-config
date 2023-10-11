# no-inline-function-event-listener

禁止事件 handler 为内联函数，如果是内联函数意味着你肯定没法 remove。

## Failed

```javascript
xxx.$events.$on('yyy', () => {});
```

## Pass

```javascript
const handleYyy = () => {};

xxx.$events.$on('yyy', handleYyy);
```
