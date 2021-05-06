'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reviewSchema = _mongoose2.default.Schema({
  product: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  summary: {
    type: String,
    required: true
  },
  recommend: {
    type: Boolean,
    default: false
  },
  response: {
    type: String,
    default: null
  },
  body: {
    type: String,
    required: true
  },
  helpfulness: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photos: [{
    url: String
  }]
}, {
  timestamps: true
});

var Review = _mongoose2.default.model('Reviews', reviewSchema);

exports.default = Review;