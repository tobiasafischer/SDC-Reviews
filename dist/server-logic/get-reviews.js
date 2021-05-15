"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable camelcase */
var mongoose = require('mongoose');

var reviewSchema = require('../mongo/reviews/review');

require('regenerator-runtime');

var Review = mongoose.model('Reviews', reviewSchema["default"]);

var getReviews = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
    var product_id, page, count, vals;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            product_id = _ref.product_id, page = _ref.page, count = _ref.count;

            vals = /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", Review.find({
                          product_id: product_id
                        }).select('-__v -_id -product_id').limit(count));

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function vals() {
                return _ref3.apply(this, arguments);
              };
            }(); // .skip(count * page - 1);


            return _context2.abrupt("return", vals().then(function (res) {
              return {
                product: "".concat(product_id),
                page: page,
                count: count,
                results: res
              };
            })["catch"](function (err) {
              console.log(err);
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getReviews(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  getReviews: getReviews
};
exports["default"] = _default;