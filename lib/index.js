"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  core: true,
  express: true,
  HttpError: true,
  Config: true,
  Server: true,
  Controller: true,
  Authentication: true
};
exports.core = core;
Object.defineProperty(exports, "express", {
  enumerable: true,
  get: function get() {
    return _express["default"];
  }
});
Object.defineProperty(exports, "HttpError", {
  enumerable: true,
  get: function get() {
    return _error["default"];
  }
});
Object.defineProperty(exports, "Config", {
  enumerable: true,
  get: function get() {
    return _service["default"];
  }
});
Object.defineProperty(exports, "Server", {
  enumerable: true,
  get: function get() {
    return _service2["default"];
  }
});
Object.defineProperty(exports, "Controller", {
  enumerable: true,
  get: function get() {
    return _service3["default"];
  }
});
Object.defineProperty(exports, "Authentication", {
  enumerable: true,
  get: function get() {
    return _service4["default"];
  }
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _callsite = _interopRequireDefault(require("callsite"));

var _express = _interopRequireWildcard(require("express"));

Object.keys(_express).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _express[key];
    }
  });
});

var _jservice = _interopRequireDefault(require("jservice"));

var _error = _interopRequireDefault(require("./server/error"));

var _service = _interopRequireDefault(require("./config/service"));

var _service2 = _interopRequireDefault(require("./server/service"));

var _service3 = _interopRequireDefault(require("./controller/service"));

var _service4 = _interopRequireDefault(require("./authentication/service"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Builder =
/*#__PURE__*/
function (_BaseBuilder) {
  _inherits(Builder, _BaseBuilder);

  function Builder() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Builder);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Builder)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "path", null);

    _defineProperty(_assertThisInitialized(_this), "configService", null);

    return _this;
  }

  _createClass(Builder, [{
    key: "configure",
    value: function configure(configureServices, _configure) {
      this.path = _path["default"].dirname((0, _callsite["default"])()[1].getFileName()); // Adding built-in services

      this._configureDefaultServices(this.collection); // Run registry after all built-in services have been added


      _get(_getPrototypeOf(Builder.prototype), "build", this).call(this, configureServices); // Initialize server


      var serverService = this.provider.service('@server'); // Configure server

      if (typeof _configure === 'function') _configure(serverService.appRoot);
      return this;
    }
  }, {
    key: "_configureDefaultServices",
    value: function _configureDefaultServices(services) {
      services.singleton(_service["default"]);
      services.singleton(_service4["default"]);
      services.singleton(_service3["default"]);
      services.singleton(_service2["default"], function (provider) {
        return provider.service('@config').get('server');
      });
    }
  }]);

  return Builder;
}(_jservice["default"]);

function core() {
  return new Builder();
}

var _default = core;
exports["default"] = _default;