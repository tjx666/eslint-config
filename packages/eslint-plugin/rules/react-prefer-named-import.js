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

    /**
     * 辅助函数：检查节点是否在类型上下文中
     *
     * @param {import('eslint').Rule.Node} node - AST 节点
     * @returns {boolean} 是否在类型上下文中
     */
    const isInTypeContext = (node) => {
        let current = node;
        while (current.parent) {
            if (current.parent.type.startsWith('TS')) {
                return true;
            }
            current = current.parent;
        }
        return false;
    };

    /**
     * 辅助函数：处理 React API 引用
     *
     * @param {import('eslint').Rule.Node} node - AST 节点
     * @param {Set<string>} apis - React API 集合
     * @param {Set<string>} typeRefs - React 类型引用集合
     */
    const handleReactReference = (node, apis, typeRefs) => {
        const name = node.type === 'MemberExpression' ? node.property.name : node.right.name;
        if (isInTypeContext(node)) {
            typeRefs.add(name);
        } else {
            apis.add(name);
        }
    };

    /**
     * 辅助函数：生成导入语句
     *
     * @param {Set<string>} imports - 导入项集合
     * @param {boolean} hasSemicolon - 是否需要分号
     * @returns {string} 导入语句
     */
    const generateImportStatement = (imports, hasSemicolon) => {
        const sortedImports = Array.from(imports).sort((a, b) => a.localeCompare(b));
        return `import { ${sortedImports.join(', ')} } from 'react'${hasSemicolon ? ';' : ''}`;
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
                handleReactReference(node, reactApis, reactTypeRefs);
            }
        },

        // 收集类型引用
        'TSQualifiedName': function (node) {
            if (
                node.left.type === 'Identifier' &&
                node.left.name === 'React' &&
                node.right.type === 'Identifier'
            ) {
                handleReactReference(node, reactApis, reactTypeRefs);
            }
        },

        // 提供修复
        'Program:exit': function () {
            if (reactApis.size === 0 && reactTypeRefs.size === 0) return;

            if (reactImportNode) {
                context.report({
                    node: reactImportNode,
                    messageId: MESSAGE_ID_DEFAULT,
                    *fix(fixer) {
                        // 1. 收集所有需要处理的节点
                        const memberExpressions = [];
                        const qualifiedNames = [];
                        traverseNode(sourceCode.ast, (node) => {
                            if (node.type === 'MemberExpression') {
                                memberExpressions.push(node);
                            } else if (node.type === 'TSQualifiedName') {
                                qualifiedNames.push(node);
                            }
                        });

                        // 2. 替换所有 React.xxx 的引用
                        const replaceNodes = [...memberExpressions, ...qualifiedNames];
                        for (const node of replaceNodes) {
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
                                const name =
                                    node.type === 'MemberExpression'
                                        ? node.property.name
                                        : node.right.name;
                                yield fixer.replaceText(node, name);
                            }
                        }

                        // 3. 合并所有 React 导入
                        const existingImports = getExistingNamedImports();
                        const allImports = new Set([
                            ...existingImports,
                            ...reactApis,
                            ...reactTypeRefs,
                        ]);

                        // 4. 生成新的导入语句
                        const hasSemicolon = sourceCode.getText(reactImportNode).endsWith(';');
                        const newImport = generateImportStatement(allImports, hasSemicolon);

                        // 5. 处理导入语句替换
                        const replacedNode = existingNamedImports || reactImportNode;
                        yield fixer.replaceText(replacedNode, newImport);
                        if (
                            existingNamedImports &&
                            reactImportNode &&
                            existingNamedImports !== reactImportNode
                        ) {
                            const afterReactImport = sourceCode.text.slice(
                                reactImportNode.range[1],
                            );
                            const match = afterReactImport.match(/^\n+/);
                            yield fixer.removeRange([
                                reactImportNode.range[0],
                                reactImportNode.range[1] + (match ? match[0].length : 0),
                            ]);
                        }
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
