/* eslint-disable no-undef */
const path = require('path');
const csv = require('fast-csv');
const mongoose = require('mongoose');
const characterisiticsSchema = require('../mongo/reviews/characteristics');
const characteristicsMetaSchema = require('../mongo/reviews/characteristicMeta');

const Characteristics = mongoose.model('Characteristics', characterisiticsSchema.default);
const CharacteristicsMeta = mongoose.model('CharacteristicsMeta', characteristicsMetaSchema.default);

const url = 'mongodb://localhost:27017/reviews';

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const parseCharacteristics = (file) => {
  let counterR = 0;
  let arr = [];
  const jsons = [];
  let ids = [];
  let val = {};
  let counter = 0;
  let prev = null;
  csv
    .parseFile(file, { headers: true, maxRows: 10000 })
    .on('data', (data) => {
      if (!prev) prev = parseInt(data.review_id, 10);
      if (prev !== parseInt(data.review_id, 10)) {
        Characteristics.find({
          id: { $in: ids },
        }, (err, chars) => {
          counter += 1;
          for (let i = 0; i < chars.length; i += 1) {
            const value = val[`${ids[i]}`] || 0;
            jsons.push({
              name: chars[i].name,
              id: chars[i].id,
              value: `${value}.0000`,
            });
          }
          arr.push(new CharacteristicsMeta({
            id: counter,
            characteristics: jsons,
          }));
        });
        ids = [];
        val = {};
        prev = parseInt(data.review_id, 10);
      }
      ids.push(parseInt(data.characteristic_id, 10));
      val[parseInt(data.characteristic_id, 10)] = parseInt(data.value, 10);

      counterR += 1;

      if (counterR % 1000 === 0) {
        console.log(arr.length);
        CharacteristicsMeta.insertMany(arr, (err) => {
          if (err) {
            console.log(`There is an error in processing data: ${err}`);
          } else {
            console.log(`Inserted ${counterR} reviews.`);
            counter = 0;
          }
        });
        arr = [];
      }

      // }
    })
    .on('error', (error) => {
      console.log(`There is an error in processing: ${error}`);
    })
    .on('end', () => {
      // parsePhoto(path.resolve(__dirname, '../sdc-files', 'reviews_photos.csv'));
    });
};

parseCharacteristics(path.resolve(__dirname, '../../sdc-files', 'characteristic_reviews.csv'));
export default { parseCharacteristics };
