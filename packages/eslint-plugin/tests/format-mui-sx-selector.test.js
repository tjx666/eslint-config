'use strict';

const { ruleTester } = require('./utils');
const rule = require('../rules/format-mui-sx-selector');

const [MESSAGE_ID_DEFAULT] = Object.keys(rule.meta.messages);

const code = `const sx = {
    '   &.MuiButton-root    .box.name  ': {
        color: 'red',
    },
}`;

const fixCode = `const sx = {
    '&.MuiButton-root .box.name': {
        color: 'red',
    },
}`;

ruleTester.run('format-mui-sx-selector', rule, {
    valid: [],
    invalid: [
        {
            code,
            errors: [{ messageId: MESSAGE_ID_DEFAULT }],
            output: fixCode,
        },
    ],
});
