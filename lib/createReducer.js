"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("./util");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * createReducer
 * @param initialState{Any} default state
 * @param handlers{Object}
 *
 * example
 * prop: createReducer(initialState, { [ACTION_TYPE]: (action, state) => to do })
 */
var _default = function _default(initialState) {
  var handlers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _util.assert)((0, _util.isObject)(handlers), 'the second argument of createReducer should be an object');
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if ({}.hasOwnProperty.call(handlers, action.type)) {
      var handler = handlers[action.type];
      (0, _util.assert)((0, _util.isFunction)(handler), "the reducer handler should be a function, but we get ".concat(_typeof(handler)));
      return handler(action, state);
    }

    return state;
  };
};

exports.default = _default;