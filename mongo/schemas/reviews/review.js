import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  product_id: Number,
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
  photos: [{
    url: String,
  }],
});

export default reviewSchema;

/*
{
  product: 1,
  rating: 5,
  summary: 'adwoiadwjoi',
  recommend: 1,
  response: null,
  body: 'adoijwawdo',
  helpfulness: 3,
  email: 'adspkoi',
  photos: [],
}

query
{
  [1]
  product: 1,
  rating: 5,
  summary: 'adwoiadwjoi',
  recommend: 1,
  response: null,
  body: 'adoijwawdo',
  helpfulness: 3,
  email: 'adspkoi',
  photos: [],
}
.then
review_id 1
url string
.then
*/
