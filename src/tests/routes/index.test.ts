import app from '../../app';
import request from 'supertest';

describe('GET /', () => {
  it('should return an OK message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
