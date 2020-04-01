"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var FixedError = new Schema({
  fixedDate: {
    type: Date,
    "default": Date.now
  },
  note: {
    type: String
  },
  application: {
    type: String
  },
  title: {
    type: String,
    "default": "ERROR"
  },
  description: {
    type: String
  },
  errorDate: {
    type: Date
  }
});

var _default = _mongoose["default"].model("FixedError", FixedError);

exports["default"] = _default;