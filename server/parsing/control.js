const path = require('path');
const mongoose = require('mongoose');
const { parseReview } = require('./reviews').default;
// const { parsePhoto } = require('./photos').default;

const main = (env) => {
  const url = `mongodb://localhost:27017/${env}`;

  mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  parseReview(path.resolve(__dirname, '../../sdc-files', 'reviews.csv'));
};

export default { main };
