const request = require('supertest');
const app = require('./app'); // replace with your actual server file

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
