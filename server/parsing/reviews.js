const path = require('path');
const csv = require('fast-csv');
const mongoose = require('mongoose');
const reviewSchema = require('../mongo/reviews/review');
const { parsePhoto } = require('./photos').default;

const Review = mongoose.model('Reviews', reviewSchema.default);

const url = 'mongodb://ec2-184-72-33-220.us-west-1.compute.amazonaws.com/reviews';

let counter = 0;
const max = 5777923;
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const format = (data) => {
  if (data === '1' || data === '0') {
    return data === '1';
  }
  return data === 'true';
};

const parseReview = (file) => {
  let arr = [];
  csv
    .parseFile(file, { headers: true, maxRows: 10000 })
    .on('data', (data) => {
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
        photos: [],
      }));
      if (counter % 1000 === 0) {
        Review.insertMany(arr, (err) => {
          if (err) {
            console.log(`There is an error in processing data: ${err}`);
          } else {
            console.log(`Inserted ${counter} reviews.`);
            console.log(`Review is at ${(counter / max) * 100}%\n\n`);
            arr = [];
          }
        });
      }
      counter += 1;
    })
    .on('error', (error) => {
      console.log(`There is an error in processing: ${error}`);
    })
    .on('end', () => {
      parsePhoto(path.resolve(__dirname, '../../sdc-files', 'reviews_photos.csv'));
    });
};

parseReview(path.resolve(__dirname, '../../sdc-files', 'reviews.csv'));
export default { parseReview };
