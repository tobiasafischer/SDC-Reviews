"use strict";

var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/reviews';

var main = function main() {
  mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Connection Successful!');
  });
};

main();