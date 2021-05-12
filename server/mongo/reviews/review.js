import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  review_id: { type: Number, index: { unique: true } },
  product_id: { type: String, index: 1 },
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
