/**
 * 参考：https://github.com/foad/eslint-plugin-listeners/blob/master/src/rules/event-listener.ts
 */

const {
    isNodeArrowFunctionExpression,
    isNodeFunctionExpression,
    isNodeIdentifier,
    isNodeMemberExpression,
    parseMemberExpression,
    RuleType,
} = require('./utils');

const ListenerType = {
    ADD_EVENT_LISTENER: 'addEventListener',
    REMOVE_EVENT_LISTENER: 'removeEventListener',
    DOLLAR_ON: '$on',
    DOLLAR_OFF: '$off',
};
const ListenerTypes = new Set(Object.values(ListenerType));

const PLAIN_FUNCTION = 'plain function';
const ARROW_FUNCTION = 'arrow function';

const isProhibitedHandler = (type) => type === PLAIN_FUNCTION || type === ARROW_FUNCTION;

const reportMissingListener = (context, element, eventName, loc) => {
    context.report({
        loc,
        message: `${eventName} on ${element} does not have a corresponding removeEventListener`,
    });
};

const reportListenersDoNoMatch = (context, element, eventName, add, remove, loc) => {
    context.report({
        loc,
        message: `${add} and ${remove} on ${element} for ${eventName} do not match`,
    });
};

const reportProhibitedListener = (context, element, eventName, type, loc) => {
    context.report({
        loc,
        message: `event handler for ${eventName} on ${element} is ${type}, ${type} is forbidden as event handlers`,
    });
};

const callExpressionListener = (listeners) => (node) => {
    if (isNodeMemberExpression(node.callee)) {
        const { callee } = node;
        const listenerType = callee.property?.name;

        if (ListenerTypes.has(listenerType)) {
            const element = parseMemberExpression(callee);
            const eventName = node.arguments[0].value;
            const handler = node.arguments[1];

            if (!handler) return;

            if (listenerType === ListenerType.ADD_EVENT_LISTENER) {
                const params = node.arguments?.[2]?.properties;
                if (params && params.length > 0) {
                    const isOnce = params.some(
                        (param) => param.key.name === 'once' && param.value.value,
                    );
                    if (isOnce) {
                        return;
                    }
                }
            }

            let func;

            if (isNodeFunctionExpression(handler)) {
                func = PLAIN_FUNCTION;
            } else if (isNodeArrowFunctionExpression(handler)) {
                func = ARROW_FUNCTION;
            } else if (isNodeIdentifier(handler)) {
                func = handler.name;
            } else {
                func = parseMemberExpression(handler);
            }

            const currentTypeListeners = listeners[listenerType] || {};
            listeners[listenerType] = {
                ...currentTypeListeners,
                [element]: {
                    ...currentTypeListeners[element],
                    [eventName]: {
                        func,
                        loc: node.loc,
                    },
                },
            };
        }
    }
};

const programListener = (ruleName, listeners, context) => () => {
    const addListeners = {
        ...listeners[ListenerType.ADD_EVENT_LISTENER],
        ...listeners[ListenerType.DOLLAR_ON],
    };
    const removeListeners = {
        ...listeners[ListenerType.REMOVE_EVENT_LISTENER],
        ...listeners[ListenerType.DOLLAR_OFF],
    };

    Object.keys(addListeners).forEach((element) => {
        const addEvents = addListeners[element];
        const removeEvents = removeListeners[element];

        Object.entries(addEvents).forEach(([eventName, { func, loc }]) => {
            const event = removeEvents?.[eventName];

            switch (ruleName) {
                case RuleType.MissingRemoveEventListener:
                    if (!event) {
                        reportMissingListener(context, element, eventName, loc);
                    }
                    break;

                case RuleType.InlineFunctionEventListener:
                    if (isProhibitedHandler(func)) {
                        reportProhibitedListener(context, element, eventName, func, loc);
                    }
                    break;

                case RuleType.MatchingRemoveEventListener:
                    if (event && event.func !== func) {
                        reportListenersDoNoMatch(
                            context,
                            element,
                            eventName,
                            func,
                            event.func,
                            event.loc,
                        );
                    }
                    break;
            }
        });
    });
};

exports.createRule = (ruleName) => {
    /** @type {RuleModule} */
    const rule = {
        meta: {
            type: 'problem',
            schema: [],
        },
        create: (context) => {
            const listeners = {};

            return {
                'CallExpression:exit': callExpressionListener(listeners),
                'Program:exit': programListener(ruleName, listeners, context),
            };
        },
    };
    return rule;
};
