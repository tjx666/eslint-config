'use strict';

const MESSAGE_ID_DEFAULT = 'default';

const getIndentStr = (sourceCode, line) => {
    const lineText = sourceCode.lines[line - 1];
    return lineText.slice(0, lineText.length - lineText.trimStart().length);
};

function isJsdoc(comment) {
    return comment.type === 'Block' && comment.value.startsWith('*');
}

/**
 * @param {RuleContext} ctx
 * @param {TSPropertySignature[]} propertyNodeList
 */
function checkNodes(ctx, propertyNodeList) {
    for (const propertyNode of propertyNodeList) {
        checkCommentBeforeNode(ctx, propertyNode);

        if (['TSPropertySignature', 'PropertyDefinition'].includes(propertyNode.type)) {
            checkCommentAfterNode(ctx, propertyNode);
        }
    }
}

/** @type {RuleCreate} */
const create = (context) => {
    return {
        /**
         * @param {TSInterfaceDeclaration} node
         */
        TSInterfaceDeclaration(node) {
            return checkNodes(context, node.body.body);
        },
        /**
         * @param {TSTypeAliasDeclaration} node
         */
        TSTypeAliasDeclaration(node) {
            return (
                Array.isArray(node.typeAnnotation.members) &&
                checkNodes(context, node.typeAnnotation.members)
            );
        },

        ClassDeclaration(node) {
            return checkNodes(context, node.body.body);
        },

        FunctionDeclaration(node) {
            return checkCommentBeforeNode(context, node);
        },

        VariableDeclaration(node) {
            const declarator = node.declarations[0];
            // const f = () => {}
            // const f = function(){}
            if (
                node.declarations.length === 1 &&
                ['ArrowFunctionExpression', 'FunctionExpression'].includes(declarator.init?.type)
            ) {
                return checkCommentBeforeNode(context, node);
            }
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
            [MESSAGE_ID_DEFAULT]: '应该使用 jsdoc 注释而不是单行注释',
        },
    },
    create,
};

/**
 * @param {RuleContext} ctx
 */
function checkCommentBeforeNode(ctx, propertyNode) {
    const { sourceCode } = ctx;
    const commentsBefore = sourceCode.getCommentsBefore(propertyNode);
    if (commentsBefore.length === 0) return;

    // 注释和节点之间有空行就不处理
    const textBetween = sourceCode.text.slice(
        commentsBefore.at(-1).range[1],
        propertyNode.range[0],
    );
    let eolCount = 0;
    for (const char of textBetween) {
        if (char === '\n') {
            eolCount++;
            if (eolCount === 2) return;
        }
    }

    const lineCommentsBefore = [];
    for (const comment of [...commentsBefore].reverse()) {
        const commentContent = comment.value.trimStart();
        if (
            isJsdoc(comment) ||
            commentContent.startsWith('@ts-') ||
            commentContent.startsWith('eslint-') ||
            commentContent.startsWith('prettier-')
        ) {
            break;
        } else {
            lineCommentsBefore.push(comment);
        }
    }

    lineCommentsBefore.reverse();
    if (lineCommentsBefore.length > 0) {
        const firstLineCommentBefore = lineCommentsBefore[0];
        const lastLineCommentBefore = lineCommentsBefore.at(-1);
        ctx.report({
            loc: {
                start: firstLineCommentBefore.loc.start,
                end: lastLineCommentBefore.loc.end,
            },
            messageId: MESSAGE_ID_DEFAULT,
            fix(fixer) {
                let jsdoc;
                if (
                    lineCommentsBefore.length === 1 &&
                    !['VariableDeclaration', 'FunctionDeclaration', 'MethodDefinition'].includes(
                        propertyNode.type,
                    )
                ) {
                    jsdoc = `/**${lineCommentsBefore[0].value.trimEnd()} */`;
                } else {
                    const commentValueList = lineCommentsBefore.map(
                        (comment) => ` *${comment.value.trimEnd()}`,
                    );
                    const indentStr = getIndentStr(
                        sourceCode,
                        firstLineCommentBefore.loc.start.line,
                    );
                    jsdoc =
                        // eslint-disable-next-line prefer-template
                        '/**\n' +
                        [...commentValueList, ' */']
                            .map((text) => `${indentStr}${text}`)
                            .join('\n');
                }
                return fixer.replaceTextRange(
                    [firstLineCommentBefore.range[0], lastLineCommentBefore.range[1]],
                    jsdoc,
                );
            },
        });
    }
}

/**
 * @param {RuleContext} ctx
 */
function checkCommentAfterNode(ctx, propertyNode) {
    const { sourceCode } = ctx;
    const commentsAfter = sourceCode.getCommentsAfter(propertyNode);
    if (commentsAfter.length === 0) return;

    // 注释和节点不在同一行不处理
    const textBetween = sourceCode.text.slice(propertyNode.range[1], commentsAfter[0].range[0]);
    if (textBetween.includes('\n')) {
        return;
    }

    if (
        commentsAfter.length > 0 &&
        !isJsdoc(commentsAfter[0]) &&
        commentsAfter[0].loc.start.line === propertyNode.loc.end.line
    ) {
        const lineCommentAfter = commentsAfter[0];
        ctx.report({
            node: lineCommentAfter,
            messageId: MESSAGE_ID_DEFAULT,
            fix(fixer) {
                const indentStr = getIndentStr(sourceCode, propertyNode.loc.start.line);
                const jsdoc = `/**${lineCommentAfter.value.trimEnd()} */`;
                const propertyText = sourceCode.getText(propertyNode);
                const newPropertyText = `${jsdoc}\n${indentStr}${propertyText}`;
                return [
                    fixer.removeRange([propertyNode.range[1], lineCommentAfter.range[1]]),
                    fixer.replaceText(propertyNode, newPropertyText),
                ];
            },
        });
    }
}
