import app from '../../app';
import request from 'supertest';

describe('POST /api/upload', () => {
  it('should return an OK message', async () => {
    const res = await request(app).post('/api/upload');
    expect(res.statusCode).toBe(200);
  });
});
