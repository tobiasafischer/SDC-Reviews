/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const { getReviews } = require('../server/server-logic/get-reviews').default;

const max = 707734;
let date = 0;
let counter = 0;
const url = 'mongodb://localhost:27017/reviews';

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const testReview = async (maxN, percent, page, count) => {
  for (let i = maxN; i >= maxN * percent; i -= 1) {
    try {
      counter += 1;
      const start = Date.now();
      const val = await getReviews({ product_id: i, page, count });
      const end = Date.now();
      date += end - start;
      if (val.results.length > 0) console.log(`Executed product_id ${i} in ${end - start} ms`);
      else console.log(`No item for product_id ${i}`);
    } catch (e) {
      console.log(e);
    }
  }
  console.log(`The average query time for retrieving ${counter} documents was ${date / counter} ms.`);
};

testReview(max, 0.9, 1, 1);
export default { getReviews };
