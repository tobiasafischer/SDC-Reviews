const csv = require('fast-csv');
const mongoose = require('mongoose');
const reviewSchema = require('../mongo/reviews/review');

const Review = mongoose.model('Reviews', reviewSchema.default);

let counter = 0;
const max = 2742833;

const parsePhoto = (file) => {
  csv
    .parseFile(file, { headers: true, maxRows: 10000 })
    .on('data', (data) => {
      Review.updateMany({ review_id: data.review_id },
        {
          $push: {
            photos: data.url,
          },
        })
        .exec((err) => {
          if (err) console.log(err);
          console.log(`Inserted ${counter} photos.`);
          console.log(`Photo is at ${(counter / max) * 100}%\n\n`);
        });
      counter += 1;
    })
    .on('error', (error) => {
      console.log(`There is an error in processing: ${error}`);
    })
    .on('end', () => {
      console.log('done');
    });
};

export default { parsePhoto };
