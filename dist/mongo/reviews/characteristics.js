"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var characterisiticsSchema = _mongoose["default"].Schema({
  id: {
    type: Number,
    index: 1
  },
  product_id: Number,
  name: String
}, {
  collection: 'characteristics'
});

var _default = characterisiticsSchema;
exports["default"] = _default;