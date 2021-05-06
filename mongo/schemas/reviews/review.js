import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  review_id: String,
  product_id: String,
  rating: String,
  date: String,
  summary: String,
  body: String,
  recommend: String,
  reported: String,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: String,
  photos: [{
    url: String,
  }],
});

export default reviewSchema;
