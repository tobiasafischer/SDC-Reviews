const express = require('express');

const app = express();
const port = process.env.PORT || 8080; // set our port
const router = express.Router(); // get an instance of the express Router

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);

app.listen(port);
console.log(`Magic happens on port ${port}`);
