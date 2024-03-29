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

var updateHelpful = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(review_id) {
    var doc;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Review.find({
              review_id: review_id
            });

          case 2:
            doc = _context.sent;
            doc[0].helpfulness += 1;
            return _context.abrupt("return", doc[0].save()["catch"](function (err) {
              return err;
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateHelpful(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  updateHelpful: updateHelpful
};
exports["default"] = _default;