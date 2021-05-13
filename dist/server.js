"use strict";

var express = require('express');

var mongoose = require('mongoose');

var getReviews = require('./server-logic/get-reviews')["default"].getReviews;

var postReviews = require('./server-logic/post-reviews')["default"].postReviews;

var updateHelpful = require('./server-logic/update-helpful')["default"].updateHelpful;

var updateReport = require('./server-logic/update-report')["default"].updateReport;

var getMetaData = require('./server-logic/get-metadata')["default"].getMetaData;

require('regenerator-runtime');

var app = express();
var port = process.env.PORT || 8080; // set our port

var router = express.Router(); // get an instance of the express Router

app.use(express.json({
  limit: '50mb',
  extended: true
}));
app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));
var url = 'mongodb://ec2-13-57-181-38.us-west-1.compute.amazonaws.com:27017/reviews';
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
router.get('/', function (req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});
router.get('/reviews', function (req, res) {
  getReviews({
    product_id: parseInt(req.query.product_id, 10),
    page: parseInt(req.query.page, 10),
    count: parseInt(req.query.count, 10)
  }).then(function (jsons) {
    res.json(jsons.results.filter(function (json) {
      return !json.reported;
    }));
  });
});
router.post('/reviews', function (req, res) {
  postReviews(req.body).then(function (err) {
    if (err) res.sendStatus(500);else res.sendStatus(201);
  });
});
router.get('/reviews/meta', function (req, res) {
  getMetaData().then(function (val) {
    res.json(val);
  })["catch"](function () {
    res.sendStatus(500);
  });
});
router.put('/reviews/:review_id/helpful', function (req, res) {
  updateHelpful(req.params.review_id).then(function (err) {
    if (err) res.sendStatus(204);else res.sendStatus(200);
  });
});
router.put('/reviews/:review_id/report', function (req, res) {
  updateReport(req.params.review_id).then(function (err) {
    if (err) res.sendStatus(204);else res.sendStatus(200);
  });
});
app.use('/api', router);
app.listen(port);
console.log("Magic happens on port ".concat(port));