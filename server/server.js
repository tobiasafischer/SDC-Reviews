const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('regenerator-runtime');

const { getReviews } = require('./server-logic/get-reviews').default;
const { postReviews } = require('./server-logic/post-reviews').default;
const { updateHelpful } = require('./server-logic/update-helpful').default;
const { updateReport } = require('./server-logic/update-report').default;
const { getMetaData } = require('./server-logic/get-metadata').default;

const app = express();
const port = process.env.PORT || 3000; // set our port
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const url = 'mongodb://184.72.33.220:27017/reviews';

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.get('/loaderio-d70ce9175132d999fa0f36bf2d214fb0', (req, res) => {
  res.sendFile(path.join(__dirname, '../loaderio-d70ce9175132d999fa0f36bf2d214fb0.txt'));
});

app.get('/reviews', (req, res) => {
  console.log(req.query);
  getReviews({
    product_id: parseInt(req.query.product_id, 10),
    page: parseInt(req.query.page, 10),
    count: parseInt(req.query.count, 10),
  })
    .then((jsons) => {
      console.log(jsons);
      res.json(jsons.results.filter((json) => !json.reported));
    });
});

app.post('/reviews', (req, res) => {
  postReviews(req.body)
    .then((err) => {
      if (err) res.sendStatus(500);
      else res.sendStatus(201);
    });
});

app.get('/reviews/meta', (req, res) => {
  getMetaData()
    .then((val) => {
      res.json(val);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  updateHelpful(req.params.review_id)
    .then((err) => {
      if (err) res.sendStatus(204);
      else res.sendStatus(200);
    });
});

app.put('/reviews/:review_id/report', (req, res) => {
  updateReport(req.params.review_id)
    .then((err) => {
      if (err) res.sendStatus(204);
      else res.sendStatus(200);
    });
});

app.listen(port);
console.log(`Magic happens on port ${port}`);
