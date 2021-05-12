/* eslint-disable camelcase */
const mongoose = require('mongoose');
const reviewSchema = require('../mongo/reviews/review');

const Review = mongoose.model('Reviews', reviewSchema.default);

const updateReport = async (review_id) => {
  const doc = await Review.find({ review_id });
  console.log(doc);
  if (!doc[0].reported) {
    doc[0].reported = true;
    return doc[0].save().catch((err) => err);
  }
  return null;
};

export default { updateReport };
