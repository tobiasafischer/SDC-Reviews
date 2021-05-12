"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var path = require('path');

var csv = require('fast-csv');

var mongoose = require('mongoose');

var reviewSchema = require('../mongo/reviews/review');

var parsePhoto = require('./photos')["default"].parsePhoto;

var Review = mongoose.model('Reviews', reviewSchema["default"]);
var url = 'mongodb://localhost:27017/reviews';
var counter = 0;
var max = 5777923;
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var format = function format(data) {
  if (data === '1' || data === '0') {
    return data === '1';
  }

  return data === 'true';
};

var parseReview = function parseReview(file) {
  var arr = [];
  csv.parseFile(file, {
    headers: true,
    maxRows: 10000
  }).on('data', function (data) {
    arr.push(new Review({
      review_id: parseInt(data.id, 10),
      product_id: data.product_id,
      rating: parseInt(data.rating, 10),
      date: data.date,
      summary: data.summary,
      body: data.body,
      recommend: format(data.recommend),
      reported: format(data.reported),
      reviewer_name: data.reviewer_name,
      reviewer_email: data.reviewer_email,
      response: data.response,
      helpfulness: parseInt(data.helpfulness, 10),
      photos: []
    }));

    if (counter % 1000 === 0) {
      Review.insertMany(arr, function (err) {
        if (err) {
          console.log("There is an error in processing data: ".concat(err));
        } else {
          console.log("Inserted ".concat(counter, " reviews."));
          console.log("Review is at ".concat(counter / max * 100, "%\n\n"));
          arr = [];
        }
      });
    }

    counter += 1;
  }).on('error', function (error) {
    console.log("There is an error in processing: ".concat(error));
  }).on('end', function () {
    parsePhoto(path.resolve(__dirname, '../../sdc-files', 'reviews_photos.csv'));
  });
};

parseReview(path.resolve(__dirname, '../../sdc-files', 'reviews.csv'));
var _default = {
  parseReview: parseReview
};
exports["default"] = _default;