import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  review_id: Number,
  product_id: String,
  rating: Number,
  date: String,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
  photos: [
    String,
  ],
});

export default reviewSchema;
