const path = require('path');
const csv = require('fast-csv');
const mongoose = require('mongoose');
const reviewSchema = require('../mongo/schemas/reviews/review');
const metaDataSchema = require('../mongo/schemas/reviews/metadata');

const Review = mongoose.model('Reviews', reviewSchema.default);
const MetaData = mongoose.model('MetaData', metaDataSchema.default);

const url = 'mongodb://localhost:27017/reviews';

let counterR = 0;
const max = 5777923;
let counterP = 0;
const maxP = 2742833;
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

// const getRecommend = (product_id) => {
//   const json = {
//     0: 0,
//     1: 0,
//   };
//   Review.find().sort({ product_id })
//     .then((vals) => {
//       vals.forEach((val) => {
//         if (val.recommend) json[1] += 1;
//         else json[0] += 1;
//       });
//       return json;
//     });
// };

// const getRatings = (product_id) => {
//   const json = {
//     0,
//     1,
//     2,
//     3,
//     4,
//     5
//   };
// };

// const parseCharacteristics = (file) => {
//   csv
//     .parseFile(file, { headers: true, maxRows: 10000 })
//     .on('data', (data) => {
//       const arr = [];
//       const usedProduct = [];
//       arr.push(new MetaData(
//         {
//           product_id: data.product_id,
//           ratings: getRatings(data.product_id),
//           recommended: getRecommend(data.product_id),
//           characteristics: {
//             Size: {
//               id,
//               value,
//             },
//             Width: {
//               id,
//               value,
//             },
//             Comfort: {
//               id,
//               value,
//             },
//           },
//         },
//       ));
//     })
//     .on('error', (error) => {
//       console.log(`There is an error in processing: ${error}`);
//     })
//     .on('end', () => {
//       console.log('done');
//     });
// };

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
          console.log(`Inserted ${counterP} reviews.`);
          console.log(`Photo is at ${(counterP / maxP) * 100}%\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`);
        });
      counterP += 1;
    })
    .on('error', (error) => {
      console.log(`There is an error in processing: ${error}`);
    })
    .on('end', () => {
      console.log('done');
    });
};

const parseReview = (file) => {
  let arr = [];
  csv
    .parseFile(file, { headers: true, maxRows: 50000 })
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
      if (counterR % 1000 === 0) {
        Review.insertMany(arr, (err) => {
          if (err) {
            console.log(`There is an error in processing data: ${err}`);
          } else {
            console.log(`Inserted ${counterR} reviews.`);
            console.log(`Review is at ${(counterR / max) * 100}%\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`);
            arr = [];
          }
        });
      }
      counterR += 1;
    })
    .on('error', (error) => {
      console.log(`There is an error in processing: ${error}`);
    })
    .on('end', () => {
      parsePhoto(path.resolve(__dirname, '../sdc-files', 'reviews_photos.csv'));
    });
};

parseReview(path.resolve(__dirname, '../sdc-files', 'reviews.csv'));
export default { parseReview, parsePhoto };
