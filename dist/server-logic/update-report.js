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

var updateReport = /*#__PURE__*/function () {
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
            console.log(doc);

            if (doc[0].reported) {
              _context.next = 7;
              break;
            }

            doc[0].reported = true;
            return _context.abrupt("return", doc[0].save()["catch"](function (err) {
              return err;
            }));

          case 7:
            return _context.abrupt("return", null);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateReport(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  updateReport: updateReport
};
exports["default"] = _default;