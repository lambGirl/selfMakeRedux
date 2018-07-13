"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _until = require("./until");

var _constant = require("./constant");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _zoro;

var middleware = function middleware(_ref) {
  var dispatch = _ref.dispatch;
  return function (next) {
    return (
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(action) {
          var type, handler, _splitType, namespace, result;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _zoro.handleAction.apply(undefined, [action]);

                  _zoro.plugin.emit(_constant.PLUGIN_EVENT.ON_WILL_ACTION, action, _zoro.store);

                  type = action.type;
                  handler = _zoro.getEffects()[type];

                  if (!(0, _until.isFunction)(handler)) {
                    _context.next = 22;
                    break;
                  }

                  _context.prev = 5;

                  _zoro.handleEffect.apply(undefined, [action]);

                  _zoro.plugin.emit(_constant.PLUGIN_EVENT.ON_WILL_EFFECT, action, _zoro.store);

                  _splitType = (0, _until.splitType)(type), namespace = _splitType.namespace;
                  _context.next = 11;
                  return handler(action, {
                    selectAll: (0, _until.selectCreator)(_zoro.store),
                    select: (0, _until.selectCreator)(_zoro.store, namespace),
                    put: (0, _until.putCreator)(_zoro.store, namespace)
                  });

                case 11:
                  result = _context.sent;
                  return _context.abrupt("return", result);

                case 15:
                  _context.prev = 15;
                  _context.t0 = _context["catch"](5);

                  _zoro.handleError.apply(undefined, [_context.t0]);

                  _zoro.plugin.emit(_constant.PLUGIN_EVENT.ON_ERROR, _context.t0, _zoro.store);

                case 19:
                  _context.prev = 19;

                  _zoro.plugin.emit(_constant.PLUGIN_EVENT.ON_DID_EFFECT, action, _zoro.store);

                  return _context.finish(19);

                case 22:
                  _zoro.plugin.emit(_constant.PLUGIN_EVENT.ON_DID_ACTION, action, _zoro.store);

                  return _context.abrupt("return", next(action));

                case 24:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[5, 15, 19, 22]]);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }()
    );
  };
};

var _default = function _default(zoro) {
  _zoro = zoro;
  return middleware;
};

exports.default = _default;