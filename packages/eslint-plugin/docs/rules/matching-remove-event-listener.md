# matching-remove-event-listener

移除的事件 handler 必须和注册的 handler 相匹配

## Failed

```javascript
const handleClick = () => {};
const handleMove = () => {};

window.addEventListener('click', handleClick);
window.removeEventListener('click', handleMove);
```

## Pass

```javascript
const handleClick = () => {};

window.addEventListener('click', handleClick);
window.removeEventListener('click', handleClick);
```
