//驱动盘空间路径 相对的
export const NAMESPACE_DIVIDER = '/'

//所有actions 的type封装
export const PLUGIN_EVENT = {
    INJECT_INITIAL_STATE: 'injectInitialState',
    INJECT_MODELS: 'injectModels',
    INJECT_MIDDLEWARES: 'injectMiddlewares',
    ON_WILL_EFFECT: 'onWillEffect',
    ON_DID_EFFECT: 'onDidEffect',
    ON_WILL_ACTION: 'onWillAction',
    ON_DID_ACTION: 'onDidAction',
    ON_SETUP: 'onSetup',
    ON_SUBSCRIBE: 'onSubscribe',
    ON_ERROR: 'onError',
}
