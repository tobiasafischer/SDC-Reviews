import mongoose from 'mongoose';

const characterisiticsSchema = mongoose.Schema(
  {
    id: { type: Number, index: 1 },
    product_id: Number,
    name: String,
  },
  {
    collection: 'characteristics',
  },
);

export default characterisiticsSchema;
