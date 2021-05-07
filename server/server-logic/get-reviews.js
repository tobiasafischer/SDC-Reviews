/* eslint-disable camelcase */
const mongoose = require('mongoose');
const reviewSchema = require('../../mongo/schemas/reviews/review');

const Review = mongoose.model('Reviews', reviewSchema.default);

const getReviews = async (page, count, sort, product_id) => {
  const vals = async () => Review.find({ product_id }).select('-__v -_id -product_id').limit(20);
  return vals().then((res) => ({
    product: `${product_id}`,
    page,
    count,
    results: res,
  }));
};

export default { getReviews };
