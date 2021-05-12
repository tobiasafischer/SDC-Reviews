"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable no-undef */
var path = require('path');

var csv = require('fast-csv');

var mongoose = require('mongoose');

var characterisiticsSchema = require('../mongo/reviews/characteristics');

var characteristicsMetaSchema = require('../mongo/reviews/characteristicMeta');

var Characteristics = mongoose.model('Characteristics', characterisiticsSchema["default"]);
var CharacteristicsMeta = mongoose.model('CharacteristicsMeta', characteristicsMetaSchema["default"]);
var url = 'mongodb://localhost:27017/reviews';
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var parseCharacteristics = function parseCharacteristics(file) {
  var counterR = 0;
  var arr = [];
  var jsons = [];
  var ids = [];
  var val = {};
  var counter = 0;
  var prev = null;
  csv.parseFile(file, {
    headers: true,
    maxRows: 10000
  }).on('data', function (data) {
    if (!prev) prev = parseInt(data.review_id, 10);

    if (prev !== parseInt(data.review_id, 10)) {
      Characteristics.find({
        id: {
          $in: ids
        }
      }, function (err, chars) {
        counter += 1;

        for (var i = 0; i < chars.length; i += 1) {
          var value = val["".concat(ids[i])] || 0;
          jsons.push({
            name: chars[i].name,
            id: chars[i].id,
            value: "".concat(value, ".0000")
          });
        }

        arr.push(new CharacteristicsMeta({
          id: counter,
          characteristics: jsons
        }));
      });
      ids = [];
      val = {};
      prev = parseInt(data.review_id, 10);
    }

    ids.push(parseInt(data.characteristic_id, 10));
    val[parseInt(data.characteristic_id, 10)] = parseInt(data.value, 10);
    counterR += 1;

    if (counterR % 1000 === 0) {
      console.log(arr.length);
      CharacteristicsMeta.insertMany(arr, function (err) {
        if (err) {
          console.log("There is an error in processing data: ".concat(err));
        } else {
          console.log("Inserted ".concat(counterR, " reviews."));
          counter = 0;
        }
      });
      arr = [];
    } // }

  }).on('error', function (error) {
    console.log("There is an error in processing: ".concat(error));
  }).on('end', function () {// parsePhoto(path.resolve(__dirname, '../sdc-files', 'reviews_photos.csv'));
  });
};

parseCharacteristics(path.resolve(__dirname, '../../sdc-files', 'characteristic_reviews.csv'));
var _default = {
  parseCharacteristics: parseCharacteristics
};
exports["default"] = _default;