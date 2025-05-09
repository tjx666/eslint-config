'use strict';

const { ruleTester } = require('./utils');
const rule = require('../rules/no-declare-implicit-any-var');

const [MESSAGE_ID_DEFAULT] = Object.keys(rule.meta.messages);

ruleTester.run('no-declare-implicit-any-var', rule, {
    valid: [
        {
            filename: 'test.ts',
            code: 'const a = ref<string[]>([])',
        },
        {
            filename: 'test.ts',
            code: 'const a = ref([] as string[])',
        },
        {
            filename: 'test.ts',
            code: 'const a = ref<string>()',
        },
        {
            filename: 'test.ts',
            code: 'let a: string',
        },
        {
            filename: 'test.ts',
            code: 'let a: string[] = []',
        },
    ],
    invalid: [
        {
            filename: 'test.ts',
            code: 'let a',
            errors: [
                {
                    messageId: MESSAGE_ID_DEFAULT,
                },
            ],
        },
        {
            filename: 'test.ts',
            code: 'let a = []',
            errors: [
                {
                    messageId: MESSAGE_ID_DEFAULT,
                },
            ],
        },
        {
            filename: 'test.ts',
            code: 'const a = ref()',
            errors: [
                {
                    messageId: MESSAGE_ID_DEFAULT,
                },
            ],
        },
        {
            filename: 'test.ts',
            code: 'const a = ref([])',
            errors: [
                {
                    messageId: MESSAGE_ID_DEFAULT,
                },
            ],
        },
    ],
});
