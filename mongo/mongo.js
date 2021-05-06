const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/reviews';

const main = () => {
  mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('Connection Successful!');
  });
};

main();
