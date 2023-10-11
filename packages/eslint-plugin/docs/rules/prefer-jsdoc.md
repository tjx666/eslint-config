# 优先使用 jsdoc

jsdoc 注释支持 IDE 提示。

💡 通过编辑器手动修复。

## Fail

```typescript
interface A {
  name: string; // xxx
}

type A = {
  // xxx
  name: string;
};

// xxx
function a() {}

// xxx
const a = () => {};

// xxx
const a = function () {};

class A {
  name: string; // xxx

  // xxx
  f() {}
}
```

## Pass

```typescript
interface A {
    /** xxx */
    name: string;
}

type A {
    /** xxx */
    name: string;
}

/**
 * xxx
 */
function a() {}

/**
 * xxx
 */
const a = () => {}

/**
 * xxx
 */
const a = function(){}

class A {
    /** xxx */
    name: string;

    /**
     * xxx
     */
    f() {}
}
```
