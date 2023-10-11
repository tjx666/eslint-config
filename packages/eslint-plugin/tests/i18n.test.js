'use strict';

const rule = require('../rules/i18n');
const { ruleTester } = require('./utils');

const errorCode1 = `
<template>
    <div>{{ '我是一只鱼' }}</div>
</template>`;

ruleTester.run('i18n', rule, {
    valid: [
        {
            code: `
<template>
    <div>666</div>
</template>`,
            options: [],
        },
    ],

    invalid: [
        {
            code: errorCode1,
            errors: [{ message: rule.meta.messages.default }],
            output: errorCode1,
        },
    ],
});
