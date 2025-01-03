'use strict';

const MESSAGE_ID_DEFAULT = 'preferNamedImport';

/** @type {RuleCreate} */
const create = (context) => {
    const reactApis = new Set();
    const reactTypeRefs = new Set();
    let reactImportNode = null;
    const sourceCode = context.sourceCode;
    let existingNamedImports = null;

    /**
     * 辅助函数：获取已存在的 React 具名导入
     */
    const getExistingNamedImports = () => {
        const imports = new Set();
        sourceCode.ast.body.forEach((node) => {
            if (node.type === 'ImportDeclaration' && node.source.value === 'react') {
                node.specifiers.forEach((specifier) => {
                    if (specifier.type === 'ImportSpecifier') {
                        imports.add(specifier.imported.name);
                        // 记录第一个具名导入节点
                        if (!existingNamedImports) {
                            existingNamedImports = node;
                        }
                    }
                });
            }
        });
        return imports;
    };

    /**
     * 辅助函数：遍历 AST
     */
    const traverseNode = (node, visitor) => {
        if (!node || typeof node !== 'object') return;

        if (node.type) {
            visitor(node);
        }

        for (const key in node) {
            const child = node[key];
            if (key !== 'parent' && child && typeof child === 'object') {
                if (Array.isArray(child)) {
                    child.forEach((item) => traverseNode(item, visitor));
                } else {
                    traverseNode(child, visitor);
                }
            }
        }
    };

    return {
        // 检测 namespace import 和 default import
        'ImportDeclaration': function (node) {
            if (node.source.value === 'react') {
                node.specifiers.forEach((specifier) => {
                    if (
                        specifier.type === 'ImportNamespaceSpecifier' ||
                        specifier.type === 'ImportDefaultSpecifier'
                    ) {
                        reactImportNode = node;
                    }
                });
            }
        },

        // 收集 React API 使用
        'MemberExpression': function (node) {
            if (
                node.object.type === 'Identifier' &&
                node.object.name === 'React' &&
                node.property.type === 'Identifier'
            ) {
                // 检查是否在类型上下文中
                let current = node;
                while (current.parent) {
                    if (current.parent.type.startsWith('TS')) {
                        reactTypeRefs.add(node.property.name);
                        return;
                    }
                    current = current.parent;
                }
                // 不在类型上下文中，则为值的使用
                reactApis.add(node.property.name);
            }
        },

        // 收集类型引用
        'TSQualifiedName': function (node) {
            if (
                node.left.type === 'Identifier' &&
                node.left.name === 'React' &&
                node.right.type === 'Identifier'
            ) {
                reactTypeRefs.add(node.right.name);
            }
        },

        // 提供修复
        'Program:exit': function () {
            // 如果只有类型引用，不需要修复
            if (reactApis.size === 0) {
                return;
            }

            if (reactImportNode) {
                context.report({
                    node: reactImportNode,
                    messageId: MESSAGE_ID_DEFAULT,
                    *fix(fixer) {
                        // 1. 收集所有需要处理的节点
                        const nodesToFix = [];
                        traverseNode(sourceCode.ast, (node) => {
                            if (
                                (node.type === 'MemberExpression' &&
                                    node.object.type === 'Identifier' &&
                                    node.object.name === 'React' &&
                                    node.property.type === 'Identifier') ||
                                (node.type === 'TSQualifiedName' &&
                                    node.left.type === 'Identifier' &&
                                    node.left.name === 'React' &&
                                    node.right.type === 'Identifier')
                            ) {
                                nodesToFix.push(node);
                            }
                        });

                        // 2. 按照位置从后向前排序，这样可以避免修复重叠
                        nodesToFix.sort((a, b) => b.range[0] - a.range[0]);

                        // 3. 替换所有 React.xxx 的使用
                        for (const node of nodesToFix) {
                            if (node.type === 'MemberExpression') {
                                // 检查是否在类型上下文中
                                let current = node;
                                while (current.parent) {
                                    if (current.parent.type.startsWith('TS')) {
                                        break;
                                    }
                                    current = current.parent;
                                }
                                yield fixer.replaceText(node, node.property.name);
                            } else if (node.type === 'TSQualifiedName') {
                                yield fixer.replaceText(node, node.right.name);
                            }
                        }

                        // 4. 合并所有 React 导入
                        const existingImports = getExistingNamedImports();
                        const allImports = new Set([
                            ...existingImports,
                            ...reactApis,
                            ...reactTypeRefs,
                        ]);

                        // 5. 生成新的导入语句
                        const newImports = [];
                        const hasSemicolon = sourceCode.getText(reactImportNode).endsWith(';');
                        // 按字母序排序
                        const sortedImports = Array.from(allImports).sort((a, b) =>
                            a.localeCompare(b),
                        );
                        newImports.push(
                            `import { ${sortedImports.join(', ')} } from 'react'${hasSemicolon ? ';' : ''}`,
                        );

                        // 6. 如果有已存在的具名导入，需要移除它并替换
                        if (existingNamedImports) {
                            // 删除 namespace/default import 及其后面的空行
                            const afterReactImport = sourceCode.text.slice(
                                reactImportNode.range[1],
                            );
                            const match = afterReactImport.match(/^\n+/);
                            yield fixer.removeRange([
                                reactImportNode.range[0],
                                reactImportNode.range[1] + (match ? match[0].length : 0),
                            ]);
                            // 替换原有的 named import
                            yield fixer.replaceText(existingNamedImports, newImports[0]);
                            return;
                        }

                        // 7. 替换导入语句
                        yield fixer.replaceText(reactImportNode, newImports[0]);
                    },
                });
            }
        },
    };
};

/** @type {RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Prefer named imports from React instead of namespace import',
            category: 'Best Practices',
            recommended: true,
        },
        fixable: 'code',
        schema: [],
        messages: {
            [MESSAGE_ID_DEFAULT]: 'Prefer named imports from React instead of namespace import.',
        },
    },
    create,
};
