'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var metaDataSchema = _mongoose2.default.Schema({
  product: {
    type: Number,
    required: true
  },
  ratings: {
    0: {
      type: Number,
      required: true,
      default: 0
    },
    1: {
      type: Number,
      required: true,
      default: 0
    },
    2: {
      type: Number,
      required: true,
      default: 0
    },
    3: {
      type: Number,
      required: true,
      default: 0
    },
    4: {
      type: Number,
      required: true,
      default: 0
    },
    5: {
      type: Number,
      required: true,
      default: 0
    }
  },
  characteristics: {
    Size: {
      id: {
        type: Number
      },
      value: {
        type: String,
        default: '0.0000'
      }
    },
    Width: {
      id: {
        type: Number
      },
      value: {
        type: String,
        default: '0.0000'
      }
    },
    Comfort: {
      id: {
        type: Number
      },
      value: {
        type: String,
        default: '0.0000'
      }
    }
  },
  recommend: {
    true: {
      type: Number,
      required: true,
      default: 0
    },
    false: {
      type: Number,
      required: true,
      default: 0
    }
  }
}, {
  timestamps: true
});

var MetaData = _mongoose2.default.model('Reviews', metaDataSchema);

exports.default = MetaData;