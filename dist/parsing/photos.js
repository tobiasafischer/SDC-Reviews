"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var csv = require('fast-csv');

var mongoose = require('mongoose');

var reviewSchema = require('../mongo/reviews/review');

var Review = mongoose.model('Reviews', reviewSchema["default"]);
var counter = 0;
var max = 2742833;

var parsePhoto = function parsePhoto(file) {
  csv.parseFile(file, {
    headers: true,
    maxRows: 10000
  }).on('data', function (data) {
    Review.updateMany({
      review_id: data.review_id
    }, {
      $push: {
        photos: data.url
      }
    }).exec(function (err) {
      if (err) console.log(err);
      console.log("Inserted ".concat(counter, " photos."));
      console.log("Photo is at ".concat(counter / max * 100, "%\n\n"));
    });
    counter += 1;
  }).on('error', function (error) {
    console.log("There is an error in processing: ".concat(error));
  }).on('end', function () {
    console.log('done');
  });
};

var _default = {
  parsePhoto: parsePhoto
};
exports["default"] = _default;