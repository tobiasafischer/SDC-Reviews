"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reviewSchema = _mongoose["default"].Schema({
  review_id: {
    type: Number,
    index: {
      unique: true
    }
  },
  product_id: {
    type: String,
    index: 1
  },
  rating: Number,
  date: String,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
  photos: [String]
});

var _default = reviewSchema;
exports["default"] = _default;