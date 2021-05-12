"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var characteristicMetaSchema = _mongoose["default"].Schema({
  id: {
    type: Number,
    index: 1
  },
  characteristics: [{
    name: {
      type: String
    },
    id: {
      type: Number
    },
    value: {
      type: String
    }
  }]
});

var _default = characteristicMetaSchema;
exports["default"] = _default;