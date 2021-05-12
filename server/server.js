const express = require('express');
const mongoose = require('mongoose');
const { getReviews } = require('./server-logic/get-reviews').default;
const { postReviews } = require('./server-logic/post-reviews').default;
const { updateHelpful } = require('./server-logic/update-helpful').default;
const { updateReport } = require('./server-logic/update-report').default;
const { getMetaData } = require('./server-logic/get-metadata').default;
require('regenerator-runtime');

const app = express();
const port = process.env.PORT || 8080; // set our port
const router = express.Router(); // get an instance of the express Router
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const url = 'mongodb://localhost:27017/reviews';

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/reviews', (req, res) => {
  getReviews({
    product_id: parseInt(req.query.product_id, 10),
    page: parseInt(req.query.page, 10),
    count: parseInt(req.query.count, 10),
  })
    .then((jsons) => {
      res.json(jsons.results.filter((json) => !json.reported));
    });
});

router.post('/reviews', (req, res) => {
  postReviews(req.body)
    .then((err) => {
      if (err) res.sendStatus(500);
      else res.sendStatus(201);
    });
});

router.get('/reviews/meta', (req, res) => {
  getMetaData()
    .then((val) => {
      res.json(val);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

router.put('/reviews/:review_id/helpful', (req, res) => {
  updateHelpful(req.params.review_id)
    .then((err) => {
      if (err) res.sendStatus(204);
      else res.sendStatus(200);
    });
});

router.put('/reviews/:review_id/report', (req, res) => {
  updateReport(req.params.review_id)
    .then((err) => {
      if (err) res.sendStatus(204);
      else res.sendStatus(200);
    });
});
app.use('/api', router);

app.listen(port);
console.log(`Magic happens on port ${port}`);
