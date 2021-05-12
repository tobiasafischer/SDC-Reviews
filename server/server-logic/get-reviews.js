/* eslint-disable camelcase */
const mongoose = require('mongoose');
const reviewSchema = require('../mongo/reviews/review');
require('regenerator-runtime');

const Review = mongoose.model('Reviews', reviewSchema.default);

const getReviews = async ({ product_id, page, count }) => {
  const vals = async () => Review.find({ product_id }).select('-__v -_id -product_id').limit(count).skip(count * page);
  return vals().then((res) => ({
    product: `${product_id}`,
    page,
    count,
    results: res,
  }))
    .catch((err) => {
      console.log(err);
    });
};

export default { getReviews };
