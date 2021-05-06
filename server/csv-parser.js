const path = require('path');
const csv = require('fast-csv');
const mongoose = require('mongoose');
const reviewSchema = require('../mongo/schemas/reviews/review');

const Review = mongoose.model('Reviews', reviewSchema.default);
const MetaData = require('../mongo/schemas/reviews/metadata');

const url = 'mongodb://localhost:27017/reviews';

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

const parsePhoto = (file) => {
  csv
    .parseFile(file, { headers: true, maxRows: 5 })
    .on('data', (data) => {
      console.log(parseInt(data.review_id, 10));
      Review.findOneAndUpdate({ review_id: parseInt(data.review_id, 10) },
        {
          $push: {
            photos: { url: data.url },
          },
        })
        .exec((err, res) => {
          if (err) console.log(err);
          else console.log(res);
        });
    })
    .on('error', (error) => {
      console.log(`There is an error in processing: ${error}`);
    })
    .on('end', () => {
      console.log('done');
    });
};

const parseReview = (file) => {
  csv
    .parseFile(file, { headers: true, maxRows: 5 })
    .on('data', (data) => {
      const reviewModel = new Review({
        review_id: parseInt(data.id, 10),
        product_id: parseInt(data.product_id, 10),
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
      });
      reviewModel.save((err) => {
        if (err) {
          console.log(`There is an error in processing employee data: ${err}`);
        } else {
          console.log(`Employee data has been saved: ${data}`);
        }
      });
    })
    .on('error', (error) => {
      console.log(`There is an error in processing: ${error}`);
    })
    .on('end', () => {
      console.log('done');
      parsePhoto(path.resolve(__dirname, '../sdc-files', 'reviews_photos.csv'));
    });
};

parseReview(path.resolve(__dirname, '../sdc-files', 'reviews.csv'));
export default { parseReview, parsePhoto };
