const request = require('supertest');
const app = require('../app'); // your Express app

describe('Order Endpoints', () => {
  it('should return 400 if services are not provided', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', 'Bearer your_valid_jwt_here')
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toBe('Services must be a non-empty array');
  });
});
