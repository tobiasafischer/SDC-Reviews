import mongoose from 'mongoose';

const metaDataSchema = mongoose.Schema({
  charId: { type: Number, index: { unique: true } },
  product: {
    type: Number,
    required: true,
    index: true,
  },
  ratings: {
    0: {
      type: Number,
      required: true,
      default: 0,
    },
    1: {
      type: Number,
      required: true,
      default: 0,
    },
    2: {
      type: Number,
      required: true,
      default: 0,
    },
    3: {
      type: Number,
      required: true,
      default: 0,
    },
    4: {
      type: Number,
      required: true,
      default: 0,
    },
    5: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  characteristics: {
    Size: {
      id: {
        type: Number,
      },
      value: {
        type: String,
        default: '0.0000',
      },
    },
    Fit: {
      id: {
        type: Number,
      },
      value: {
        type: String,
        default: '0.0000',
      },
    },
    Width: {
      id: {
        type: Number,
      },
      value: {
        type: String,
        default: '0.0000',
      },
    },
    Length: {
      id: {
        type: Number,
      },
      value: {
        type: String,
        default: '0.0000',
      },
    },
    Comfort: {
      id: {
        type: Number,
      },
      value: {
        type: String,
        default: '0.0000',
      },
    },
    Quality: {
      id: {
        type: Number,
      },
      value: {
        type: String,
        default: '0.0000',
      },
    },
  },
  recommend: {
    true: {
      type: Number,
      required: true,
      default: 0,
    },
    false: {
      type: Number,
      required: true,
      default: 0,
    },
  },
});

const MetaData = mongoose.model('MetaData', metaDataSchema);

export default MetaData;
