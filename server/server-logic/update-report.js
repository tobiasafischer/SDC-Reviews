/* eslint-disable camelcase */
const mongoose = require('mongoose');
const reviewSchema = require('../../mongo/schemas/reviews/review');

const Review = mongoose.model('Reviews', reviewSchema.default);

const updateReport = async (review_id) => {
  const doc = await Review.find({ review_id });
  if (!doc.reported) {
    doc.reported = true;
    return doc.save().catch((err) => err);
  }
  return null;
};

export default { updateReport };
