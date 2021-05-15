/* eslint-disable no-unused-expressions */
import http from 'k6/http';
import { check } from 'k6';

const max = 4082170;

export default function () {
  const rnd = Math.floor(Math.random() * max - max * 0.9) + max * 0.9;
  const response = http.get(`http://localhost:3000/reviews/?product_id=${rnd}&page=1&count=20`);
  check(response, {
    'is getting value': (r) => r.status === 200,
    'review exists for product id': (r) => r.body.length > 0,
  });
}

export const options = {
  vus: 10,
  duration: '30s',
};
