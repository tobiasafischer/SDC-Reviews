"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-param-reassign */

/* eslint-disable camelcase */
var mongoose = require('mongoose');

var reviewSchema = require('../mongo/reviews/review');

var Review = mongoose.model('Reviews', reviewSchema["default"]);

var postReviews = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var newReview;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //  Review.find().sort({ review_id: -1 }).limit(1)
            //  .then((val) => {
            // data.review_id = val[0].review_id + 1;
            newReview = new Review(data);
            return _context.abrupt("return", newReview.save(function (err) {
              return err;
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postReviews(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  postReviews: postReviews
};
exports["default"] = _default;