'use strict';

const autocorrect = require('autocorrect-node');

const MESSAGE_ID_DEFAULT = 'default';

/** @type {RuleCreate} */
const create = (context) => {
    const { sourceCode } = context;
    return {
        Program() {
            const comments = sourceCode.getAllComments();
            comments.forEach((comment) => {
                const correctCommentContent = autocorrect.format(comment.value);
                if (correctCommentContent !== comment.value) {
                    context.report({
                        node: comment,
                        messageId: MESSAGE_ID_DEFAULT,
                        fix(fixer) {
                            return fixer.replaceText(
                                comment,
                                comment.type === 'Line'
                                    ? `//${correctCommentContent}`
                                    : `/*${correctCommentContent}*/`,
                            );
                        },
                    });
                }
            });
        },
    };
};

/** @type {RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
        schema: [],
        fixable: 'whitespace',
        messages: {
            [MESSAGE_ID_DEFAULT]: '中文注释排版不规范',
        },
    },
    create,
};
