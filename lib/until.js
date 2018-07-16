"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putCreator = putCreator;
exports.selectCreator = selectCreator;
exports.splitType = exports.noop = exports.isObject = exports.assert = exports.isFunction = exports.isBoolean = exports.isArray = void 0;

var _constant = require("./constant");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isArray = function isArray(arr) {
  return arr instanceof Array;
}; //判断是不是布尔类型


exports.isArray = isArray;

var isBoolean = function isBoolean(bool) {
  return typeof bool === 'boolean';
}; //判断是不是function


exports.isBoolean = isBoolean;

var isFunction = function isFunction(func) {
  return typeof func === 'function';
}; //用方法来组织继续输出后面的东西


exports.isFunction = isFunction;

var assert = function assert(validate, message) {
  if (isBoolean(validate) && !validate || isFunction(validate) && !validate()) {
    throw new Error(message);
  }
}; //判断是否为对象


exports.assert = assert;

var isObject = function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object' && !isArray(obj);
};

exports.isObject = isObject;

var noop = function noop() {}; //putCreator封装


exports.noop = noop;

function putCreator(store, namespace) {
  if (!namespace) {
    return store.dispath;
  }

  return function (_ref) {
    var type = _ref.type,
        rest = _objectWithoutProperties(_ref, ["type"]);

    assert(!!type, 'the action you dispatch is not a correct format, we need a type property');
    var types = type.split(_constant.NAMESPACE_DIVIDER);

    if (types.length >= 2) {
      var _namespace = types.slice(0, types.length - 1).join(_constant.NAMESPACE_DIVIDER);

      if (_namespace === namespace) {
        warn(false, "we don't need the dispatch with namespace, if you call in the model, [".concat(type, "]"));
      }

      return store.dispatch(_objectSpread({
        type: type
      }, rest));
    }

    return store.dispatch(_objectSpread({
      type: "".concat(namespace).concat(_constant.NAMESPACE_DIVIDER).concat(type)
    }, rest));
  };
}

function selectCreator(store, namespace) {
  return function (handler) {
    var state = store.getState();

    if (namespace && state[namespace]) {
      state = state[namespace];
    }

    return handler(state);
  };
}

var splitType = function splitType(type) {
  var divider = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constant.NAMESPACE_DIVIDER;
  var types = type.split(divider);
  assert(types.length > 1, "the model action type is not include the namespace, the type is ".concat(type));
  return {
    namespace: types.slice(0, types.length - 1).join(divider),
    type: types.slice(-1)
  };
};

exports.splitType = splitType;