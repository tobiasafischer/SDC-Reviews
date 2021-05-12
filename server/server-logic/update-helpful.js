/* eslint-disable camelcase */
const mongoose = require('mongoose');
const reviewSchema = require('../mongo/reviews/review');

const Review = mongoose.model('Reviews', reviewSchema.default);

const updateHelpful = async (review_id) => {
  const doc = await Review.find({ review_id });
  doc[0].helpfulness += 1;
  return doc[0].save().catch((err) => err);
};

export default { updateHelpful };
