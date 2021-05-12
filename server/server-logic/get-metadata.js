/* eslint-disable camelcase */
const mongoose = require('mongoose');
const reviewSchema = require('../mongo/reviews/review');

const Review = mongoose.model('Reviews', reviewSchema.default);

const getCharacteristics = async (product_id) => {
  const vals = async () => Review.find({ product_id }).select('-__v -_id -product_id');
  return vals().then((res) => ({
    product: `${product_id}`,
    ratings: res.ratings,
    recommended: res.recommended,
    characteristics: res.characteristics,
  }));
};

export default { getCharacteristics };
