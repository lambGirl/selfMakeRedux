"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _until = require("./until");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = function _default(initialState) {
  var handlers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  //先判断对象，否则throw
  (0, _until.assert)((0, _until.isObject)(handlers), 'the second argument of createReducer should be an object');
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if ({}.hasOwnProperty.call(handlers, action.type)) {
      var _handler = handlers[action.type];
      return _handler(action, state);
    } //先判断方法，否则throw


    (0, _until.assert)((0, _until.isFunction)(handler), "the reducer handler should be a function, but we get ".concat(typeof handler === "undefined" ? "undefined" : _typeof(handler)));
    return state;
  };
};

exports.default = _default;