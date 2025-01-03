'use strict';

const { ruleTester } = require('./utils');
const rule = require('../rules/react-prefer-named-import');

const MESSAGE_ID_DEFAULT = 'preferNamedImport';
const parser = require.resolve('@typescript-eslint/parser');

// 基本用例：单个 API 使用（namespace import）
const errorCode1 = `
import * as React from 'react';

function Component() {
    const [state, setState] = React.useState(0);
    return <div />;
}`;

const fixedCode1 = `
import { useState } from 'react';

function Component() {
    const [state, setState] = useState(0);
    return <div />;
}`;

// 基本用例：单个 API 使用（default import）
const errorCode2 = `
import React from 'react';

function Component() {
    const [state, setState] = React.useState(0);
    return <div />;
}`;

const fixedCode2 = `
import { useState } from 'react';

function Component() {
    const [state, setState] = useState(0);
    return <div />;
}`;

// 多个 API 使用
const errorCode3 = `
import * as React from 'react';

function Component() {
    const [state, setState] = React.useState(0);
    React.useEffect(() => {}, []);
    return React.createElement('div');
}`;

const fixedCode3 = `
import { createElement, useEffect, useState } from 'react';

function Component() {
    const [state, setState] = useState(0);
    useEffect(() => {}, []);
    return createElement('div');
}`;

// 已有部分 named import 的情况
const errorCode4 = `
import * as React from 'react';
import { useState } from 'react';

function Component() {
    const [state, setState] = useState(0);
    React.useEffect(() => {}, []);
}`;

const fixedCode4 = `
import { useEffect, useState } from 'react';

function Component() {
    const [state, setState] = useState(0);
    useEffect(() => {}, []);
}`;

// 有其他 import 的情况
const errorCode5 = `
import * as React from 'react';
import { something } from 'other-module';

function Component() {
    const [state, setState] = React.useState(0);
}`;

const fixedCode5 = `
import { useState } from 'react';
import { something } from 'other-module';

function Component() {
    const [state, setState] = useState(0);
}`;

// 多个其他模块导入的情况
const errorCode6 = `
import * as React from 'react';
import { something } from 'other-module';
import { another } from 'another-module';

function App() {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        console.log(count);
    }, [count]);
    return <div>{count}</div>;
}`;

const fixedCode6 = `
import { useEffect, useState } from 'react';
import { something } from 'other-module';
import { another } from 'another-module';

function App() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log(count);
    }, [count]);
    return <div>{count}</div>;
}`;

// 复杂场景：多个 React API 使用
const errorCode7 = `
import * as React from 'react';

function App() {
    const [count, setCount] = React.useState(0);
    const ref = React.useRef(null);
    React.useEffect(() => {
        console.log(count);
    }, [count]);
    return React.createElement('div', { ref }, count);
}`;

const fixedCode7 = `
import { createElement, useEffect, useRef, useState } from 'react';

function App() {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        console.log(count);
    }, [count]);
    return createElement('div', { ref }, count);
}`;

// TypeScript 类型使用场景
const errorCode8 = `
import * as React from 'react';

type Props = React.ComponentProps<'div'>;
interface State extends React.ComponentState {}

function App() {
    const [count, setCount] = React.useState(0);
    return <div>{count}</div>;
}`;

const fixedCode8 = `
import { ComponentProps, ComponentState, useState } from 'react';

type Props = ComponentProps<'div'>;
interface State extends ComponentState {}

function App() {
    const [count, setCount] = useState(0);
    return <div>{count}</div>;
}`;

// 混合类型和值的使用
const errorCode9 = `
import * as React from 'react';
import { useEffect } from 'react';

type Props = React.ComponentProps<'div'>;
type RefType = React.RefObject<HTMLDivElement>;

function App() {
    const [count, setCount] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);
    useEffect(() => {}, []);
    return <div ref={ref}>{count}</div>;
}`;

const fixedCode9 = `
import { ComponentProps, RefObject, useEffect, useRef, useState } from 'react';

type Props = ComponentProps<'div'>;
type RefType = RefObject<HTMLDivElement>;

function App() {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {}, []);
    return <div ref={ref}>{count}</div>;
}`;

ruleTester.run('react-prefer-named-import', rule, {
    valid: [
        {
            code: `import { useState } from 'react';`,
        },
        {
            code: `import * as Something from 'other-module';`,
        },
        {
            code: `import { createElement, useEffect, useState } from 'react';
            
function App() {
    const [count, setCount] = useState(0);
    useEffect(() => {}, []);
    return createElement('div', null, count);
}`,
        },
        {
            // 纯类型使用是合法的
            code: `
import * as React from 'react';
type Props = React.ComponentProps<'div'>;
interface State extends React.ComponentState {}`,
            parser,
        },
    ],
    invalid: [
        {
            code: errorCode1,
            errors: [{ messageId: MESSAGE_ID_DEFAULT }],
            output: fixedCode1,
        },
        {
            code: errorCode2,
            errors: [{ messageId: MESSAGE_ID_DEFAULT }],
            output: fixedCode2,
        },
        {
            code: errorCode3,
            errors: [{ messageId: MESSAGE_ID_DEFAULT }],
            output: fixedCode3,
        },
        {
            code: errorCode4,
            errors: [{ messageId: MESSAGE_ID_DEFAULT }],
            output: fixedCode4,
        },
        {
            code: errorCode5,
            errors: [{ messageId: MESSAGE_ID_DEFAULT }],
            output: fixedCode5,
        },
        {
            code: errorCode6,
            errors: [{ messageId: MESSAGE_ID_DEFAULT }],
            output: fixedCode6,
        },
        {
            code: errorCode7,
            errors: [{ messageId: MESSAGE_ID_DEFAULT }],
            output: fixedCode7,
        },
        {
            code: errorCode8,
            errors: [{ messageId: MESSAGE_ID_DEFAULT }],
            output: fixedCode8,
            parser,
        },
        {
            code: errorCode9,
            errors: [{ messageId: MESSAGE_ID_DEFAULT }],
            output: fixedCode9,
            parser,
        },
    ],
});
