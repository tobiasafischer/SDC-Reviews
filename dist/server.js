"use strict";

var express = require('express');

var mongoose = require('mongoose');

var path = require('path');

require('regenerator-runtime');

var getReviews = require('./server-logic/get-reviews')["default"].getReviews;

var postReviews = require('./server-logic/post-reviews')["default"].postReviews;

var updateHelpful = require('./server-logic/update-helpful')["default"].updateHelpful;

var updateReport = require('./server-logic/update-report')["default"].updateReport;

var getMetaData = require('./server-logic/get-metadata')["default"].getMetaData;

var app = express();
var port = process.env.PORT || 3000; // set our port

app.use(express.json({
  limit: '50mb',
  extended: true
}));
app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));
var url = 'mongodb://localhost:27017/reviews';
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.get('/', function (req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});
app.get('/loaderio-d70ce9175132d999fa0f36bf2d214fb0', function (req, res) {
  res.sendFile(path.join(__dirname, '../loaderio-d70ce9175132d999fa0f36bf2d214fb0.txt'));
});
app.get('/reviews', function (req, res) {
  console.log(req.query);
  getReviews({
    product_id: parseInt(req.query.product_id, 10),
    page: parseInt(req.query.page, 10),
    count: parseInt(req.query.count, 10)
  }).then(function (jsons) {
    console.log(jsons);
    res.json(jsons.results.filter(function (json) {
      return !json.reported;
    }));
  });
});
app.post('/reviews', function (req, res) {
  postReviews(req.body).then(function (err) {
    if (err) res.sendStatus(500);else res.sendStatus(201);
  });
});
app.get('/reviews/meta', function (req, res) {
  getMetaData().then(function (val) {
    res.json(val);
  })["catch"](function () {
    res.sendStatus(500);
  });
});
app.put('/reviews/:review_id/helpful', function (req, res) {
  updateHelpful(req.params.review_id).then(function (err) {
    if (err) res.sendStatus(204);else res.sendStatus(200);
  });
});
app.put('/reviews/:review_id/report', function (req, res) {
  updateReport(req.params.review_id).then(function (err) {
    if (err) res.sendStatus(204);else res.sendStatus(200);
  });
});
app.listen(port);
console.log("Magic happens on port ".concat(port));