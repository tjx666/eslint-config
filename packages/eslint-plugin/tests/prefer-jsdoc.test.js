'use strict';

const rule = require('../rules/prefer-jsdoc');
const { ruleTester } = require('./utils');

const [MESSAGE_ID_DEFAULT, MESSAGE_ID_MANUALLY_FIX] = Object.keys(rule.meta.messages);

const fixedCode = `
interface I {
    /** 单行注释 */
    name: string;
}`;

const errorCode1 = `
interface I {
    // 单行注释
    name: string;
}`;

const errorCode2 = `
interface I {
    // 单行注释 1
    // 单行注释 2
    name: string;
}`;
const fixedCode2 = `
interface I {
    /**
     * 单行注释 1
     * 单行注释 2
     */
    name: string;
}`;

const errorCode3 = `
interface I {
    name: string; // 单行注释 1
    // 单行注释 2
}`;
const fixedCode3 = `
interface I {
    /** 单行注释 1 */
    name: string;
    // 单行注释 2
}`;

const errorCode4 = `
type I = {
    name: string; // 单行注释 1
    // 单行注释 2
}`;
const fixedCode4 = `
type I = {
    /** 单行注释 1 */
    name: string;
    // 单行注释 2
}`;

const errorCode5 = `
type I = {
    /* 多行注释 1 */
    // 单行注释 1
    name: string;
}`;
const fixedCode5 = `
type I = {
    /**
     * 多行注释 1
     * 单行注释 1
     */
    name: string;
}`;

const errorCode6 = /* typescript */ `
type I = {
    name: string; /* 多行注释 1 */
}`;
const fixedCode6 = /* typescript */ `
type I = {
    /** 多行注释 1 */
    name: string;
}`;

ruleTester.run('prefer-jsdoc', rule, {
    valid: [
        {
            code: fixedCode,
        },
    ],
    invalid: [
        {
            code: errorCode1,
            errors: [
                {
                    messageId: MESSAGE_ID_DEFAULT,
                    suggestions: [
                        {
                            messageId: MESSAGE_ID_MANUALLY_FIX,
                            output: fixedCode,
                        },
                    ],
                },
            ],
        },
        {
            code: errorCode2,
            errors: [
                {
                    messageId: MESSAGE_ID_DEFAULT,
                    suggestions: [
                        {
                            messageId: MESSAGE_ID_MANUALLY_FIX,
                            output: fixedCode2,
                        },
                    ],
                },
            ],
        },
        {
            code: errorCode3,
            errors: [
                {
                    messageId: MESSAGE_ID_DEFAULT,
                    suggestions: [
                        {
                            messageId: MESSAGE_ID_MANUALLY_FIX,
                            output: fixedCode3,
                        },
                    ],
                },
            ],
        },
        {
            code: errorCode4,
            errors: [
                {
                    messageId: MESSAGE_ID_DEFAULT,
                    suggestions: [
                        {
                            messageId: MESSAGE_ID_MANUALLY_FIX,
                            output: fixedCode4,
                        },
                    ],
                },
            ],
        },
        {
            code: errorCode5,
            only: true,
            errors: [
                {
                    messageId: MESSAGE_ID_DEFAULT,
                    suggestions: [
                        {
                            messageId: MESSAGE_ID_MANUALLY_FIX,
                            output: fixedCode5,
                        },
                    ],
                },
            ],
        },
        {
            code: errorCode6,
            only: true,
            errors: [
                {
                    messageId: MESSAGE_ID_DEFAULT,
                    suggestions: [
                        {
                            messageId: MESSAGE_ID_MANUALLY_FIX,
                            output: fixedCode6,
                        },
                    ],
                },
            ],
        },
    ],
});
