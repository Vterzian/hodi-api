/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

describe('Equality Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});

describe('GET /', () => {
  it('should responds with json', async () => {
    const res = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toEqual('ok');
  });
});