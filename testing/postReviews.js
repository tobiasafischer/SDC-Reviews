/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const url = 'http://ec2-184-72-33-220.us-west-1.compute.amazonaws.com:3000/reviews';
  const data = JSON.stringify({
    product_id: 16058,
    rating: 5,
    summary: 'awsdasdasda',
    body: 'asdasdasdasdfasfas fasfsedgdr gdarg dragdr gdrdrgh ar',
    recommend: false,
    name: 'asddasdawsdaw',
    email: 'awdawd@ASdfasDF.egsfea',
    photos: [
      'urlplaceholder/review_5_photo_number_1.jpg',
      'urlplaceholder/review_5_photo_number_2.jpg',
    ],
    characteristics: {
      53846: 5,
      53847: 5,
      53848: 3,
      53849: 3,
    }
  });
  check(http.post(url, data), {
    'status is 201': (r) => r.status === 201,
  });
}

export const options = {
  vus: 1000,
  duration: '30s',
};
