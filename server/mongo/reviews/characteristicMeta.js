import mongoose from 'mongoose';

const characteristicMetaSchema = mongoose.Schema({
  id: { type: Number, index: 1 },
  characteristics: [
    {
      name: { type: String },
      id: { type: Number },
      value: { type: String },
    },
  ],
});

export default characteristicMetaSchema;
