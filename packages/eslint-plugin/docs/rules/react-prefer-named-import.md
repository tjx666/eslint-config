# 优先使用 React 具名导入

强制使用 React 的具名导入（named imports）而不是命名空间导入（namespace import）或默认导入（default import）。

💡 此规则是可自动修复的。

## 为什么要使用具名导入？

- 提高代码一致性，统一使用具名导入
- 减少代码体积，具名导入允许更好的 tree-shaking
- 提高代码可读性，直接看到使用了哪些 API

## Fail

```js
// ❌ 命名空间导入
import * as React from 'react';

function Component() {
    const [state, setState] = React.useState(0);
    React.useEffect(() => {}, []);
    return React.createElement('div');
}

// ❌ 默认导入
import React from 'react';

function Component() {
    const [state, setState] = React.useState(0);
    return <div>{state}</div>;
}

// ❌ 混合使用具名导入和命名空间导入
import * as React from 'react';
import { useState } from 'react';

function Component() {
    const [state, setState] = useState(0);
    React.useEffect(() => {}, []);
}

// ❌ TypeScript 中的命名空间类型引用
import * as React from 'react';

type Props = React.ComponentProps<'div'>;
interface State extends React.ComponentState {}

function Component() {
    const [state, setState] = React.useState(0);
    return <div>{state}</div>;
}
```

## Pass

```js
// ✅ 使用具名导入
import { useState } from 'react';

function Component() {
    const [state, setState] = useState(0);
    return <div>{state}</div>;
}

// ✅ 多个 API 的具名导入
import { createElement, useEffect, useState } from 'react';

function Component() {
    const [state, setState] = useState(0);
    useEffect(() => {}, []);
    return createElement('div', null, state);
}

// ✅ TypeScript 中的具名类型导入
import { ComponentProps, ComponentState, useState } from 'react';

type Props = ComponentProps<'div'>;
interface State extends ComponentState {}

function Component() {
    const [state, setState] = useState(0);
    return <div>{state}</div>;
}
```

## 注意事项

1. 此规则会自动合并已存在的具名导入
2. 导入会按字母顺序排序
3. 同时支持 JavaScript 和 TypeScript
4. 会保留代码中的分号等风格
