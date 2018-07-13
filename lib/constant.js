"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLUGIN_EVENT = exports.NAMESPACE_DIVIDER = void 0;
//驱动盘空间路径 相对的
var NAMESPACE_DIVIDER = '/'; //所有actions 的type封装

exports.NAMESPACE_DIVIDER = NAMESPACE_DIVIDER;
var PLUGIN_EVENT = {
  INJECT_INITIAL_STATE: 'injectInitialState',
  INJECT_MODELS: 'injectModels',
  INJECT_MIDDLEWARES: 'injectMiddlewares',
  ON_WILL_EFFECT: 'onWillEffect',
  ON_DID_EFFECT: 'onDidEffect',
  ON_WILL_ACTION: 'onWillAction',
  ON_DID_ACTION: 'onDidAction',
  ON_SETUP: 'onSetup',
  ON_SUBSCRIBE: 'onSubscribe',
  ON_ERROR: 'onError'
};
exports.PLUGIN_EVENT = PLUGIN_EVENT;