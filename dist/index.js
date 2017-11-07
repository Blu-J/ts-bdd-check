"use strict";
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b;
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
Object.defineProperty(exports, "__esModule", { value: true });
var testcheck = require("testcheck");
function check() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var optionsOrFn = args[0],
    fnOrA = args[1],
    restAs = args.slice(2);
  var hasOptions = !(optionsOrFn instanceof Function);
  var options = hasOptions ? optionsOrFn : {};
  var fn = hasOptions ? fnOrA : optionsOrFn;
  var genAs = hasOptions ? restAs : [fnOrA].concat(restAs);
  return function() {
    var property = testcheck.property.apply(testcheck, genAs.concat([fn]));
    var checkResult = testcheck.check(property, options);
    if (checkResult.fail) {
      throw new CheckFailure(checkResult);
    }
  };
}
exports.check = check;
var tryJson = function(value) {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return "[" + typeof value + ":" + value + "]";
  }
};
var CheckFailure = /** @class */ (function(_super) {
  __extends(CheckFailure, _super);
  function CheckFailure(checkResult) {
    var _this = _super.call(this) || this;
    var shrunk = checkResult.shrunk;
    var args = shrunk ? shrunk.smallest : checkResult.fail;
    var result = shrunk ? shrunk.result : checkResult.result;
    _this.check = checkResult;
    _this.message =
      "seed=" +
      checkResult.seed +
      " (" +
      (args || []).map(tryJson).join(", ") +
      ") => " +
      String(result);
    if (result instanceof Error) {
      // Edit stack
      _this.stack = _this.name + ": " + _this.message + "\n" + result.stack;
      // Copy over other properties
      for (var p in result) {
        if (p !== "message" && result.hasOwnProperty(p)) {
          _this[p] = result[p];
        }
      }
    }
    return _this;
  }
  return CheckFailure;
})(Error);
exports.gen = testcheck.gen;
//# sourceMappingURL=index.js.map
