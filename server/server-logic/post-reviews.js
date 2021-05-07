/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const mongoose = require('mongoose');
const reviewSchema = require('../../mongo/schemas/reviews/review');

const Review = mongoose.model('Reviews', reviewSchema.default);

const postReviews = async (data) => {
  Review.find().sort({ review_id: -1 }).limit(1)
    .then((val) => {
      data.review_id = val[0].review_id + 1;
      const newReview = new Review(data);
      return newReview.save((err) => err);
    });
};

export default { postReviews };
