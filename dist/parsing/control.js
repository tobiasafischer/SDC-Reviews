"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var path = require('path');

var mongoose = require('mongoose');

var parseReview = require('./reviews')["default"].parseReview; // const { parsePhoto } = require('./photos').default;


var main = function main(env) {
  var url = "mongodb://localhost:27017/".concat(env);
  mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  parseReview(path.resolve(__dirname, '../../sdc-files', 'reviews.csv'));
};

var _default = {
  main: main
};
exports["default"] = _default;