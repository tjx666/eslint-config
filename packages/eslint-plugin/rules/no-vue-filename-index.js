'use strict';

const path = require('node:path');

const MESSAGE_ID_DEFAULT = 'default';

/** @type {RuleCreate} */
const create = (ctx) => {
    return {
        Program() {
            const filePath = ctx.filename;
            const filename = path.basename(filePath);
            if (filename.toLowerCase() === 'index.vue') {
                ctx.report({
                    loc: { column: 0, line: 1 },
                    messageId: MESSAGE_ID_DEFAULT,
                });
            }
        },
    };
};

/** @type {RuleModule} */
module.exports = {
    meta: {
        type: 'layout',
        schema: [],
        messages: {
            [MESSAGE_ID_DEFAULT]: '.vue 文件不允许命名为 index.vue',
        },
    },
    create,
};
