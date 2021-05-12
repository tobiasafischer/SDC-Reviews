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

var Review = mongoose.model('Reviews', reviewSchema["default"]);

var getCharacteristics = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(product_id) {
    var vals;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            vals = /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", Review.find({
                          product_id: product_id
                        }).select('-__v -_id -product_id'));

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function vals() {
                return _ref2.apply(this, arguments);
              };
            }();

            return _context2.abrupt("return", vals().then(function (res) {
              return {
                product: "".concat(product_id),
                ratings: res.ratings,
                recommended: res.recommended,
                characteristics: res.characteristics
              };
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCharacteristics(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  getCharacteristics: getCharacteristics
};
exports["default"] = _default;