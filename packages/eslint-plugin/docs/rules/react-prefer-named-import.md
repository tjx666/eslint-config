# 优先使用 React 具名导入

强制使用 React 的具名导入（named imports）而不是命名空间导入（namespace import）或默认导入（default import）。

💡 此规则是可自动修复的。

## 规则说明

此规则强制要求：

- 使用具名导入替代命名空间导入（`import * as React`）
- 使用具名导入替代默认导入（`import React`）
- 所有 React API 和类型都必须使用具名导入
- 自动合并多个 React 导入为一个导入语句

## 为什么要使用具名导入？

- **更好的 Tree-shaking**: 具名导入允许打包工具更好地进行 tree-shaking，减少最终的包体积
- **代码一致性**: 统一使用具名导入，保持团队代码风格一致
- **更好的可读性**: 直接看到使用了哪些 API，无需通过 `React.xxx` 访问
- **更好的类型提示**: IDE 可以更准确地提供类型提示和自动补全
- **避免重复**: 不会出现同一个 API 既通过命名空间又通过具名导入的情况

## 规则详情

### ❌ 失败示例

```js
// 命名空间导入
import * as React from 'react';

function Component() {
    const [state, setState] = React.useState(0);
    React.useEffect(() => {}, []);
    return React.createElement('div');
}

// 默认导入
import React from 'react';

function Component() {
    const [state, setState] = React.useState(0);
    return <div>{state}</div>;
}

// 混合使用具名导入和命名空间导入
import * as React from 'react';
import { useState } from 'react';

function Component() {
    const [state, setState] = useState(0);
    React.useEffect(() => {}, []);
}

// TypeScript 中的命名空间类型引用
import * as React from 'react';

type Props = React.ComponentProps<'div'>;
interface State extends React.ComponentState {}

function Component() {
    const [state, setState] = React.useState(0);
    return <div>{state}</div>;
}

// 复杂的类型引用
import * as React from 'react';

type Props = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;
type Ref = React.RefObject<React.ElementRef<typeof AccordionPrimitive.Item>>;
```

### ✅ 通过示例

```js
// 基本使用
import { useState } from 'react';

function Component() {
    const [state, setState] = useState(0);
    return <div>{state}</div>;
}

// 多个 API 的具名导入
import { createElement, useEffect, useState } from 'react';

function Component() {
    const [state, setState] = useState(0);
    useEffect(() => {}, []);
    return createElement('div', null, state);
}

// TypeScript 中的具名类型导入
import { ComponentProps, ComponentState, useState } from 'react';

type Props = ComponentProps<'div'>;
interface State extends ComponentState {}

function Component() {
    const [state, setState] = useState(0);
    return <div>{state}</div>;
}

// 复杂类型的具名导入
import { ComponentPropsWithoutRef, ElementRef, RefObject } from 'react';

type Props = ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;
type Ref = RefObject<ElementRef<typeof AccordionPrimitive.Item>>;
```

## 自动修复行为

此规则会：

1. 自动检测所有 React API 和类型的使用
2. 将命名空间导入和默认导入转换为具名导入
3. 合并多个 React 导入为一个导入语句
4. 按字母顺序排序导入的 API 和类型
5. 保持代码中原有的分号等风格

## 注意事项

1. 此规则同时支持 JavaScript 和 TypeScript
2. 会自动处理复杂的嵌套类型引用
3. 可以与第三方库的类型定义一起使用
4. 不会影响非 React 模块的导入方式
5. 会保持代码格式化风格（分号、空格等）
