"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var ErrorMessage = new Schema({
  date: {
    type: Date,
    "default": Date.now
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
  status: {
    type: String
  }
});

var _default = _mongoose["default"].model("ErrorMessage", ErrorMessage);

exports["default"] = _default;