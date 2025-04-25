import app from '../../app';
import request from 'supertest';
import path from 'path';

describe('POST /api/upload', () => {
  it('should return an OK message', async () => {
    const filePath = path.join(__dirname, '..', 'assets', 'test.xml');
    console.log('[upload.tetst.ts] filePath=' + filePath);
    const res = await request(app)
      .post('/api/upload')
      .attach('report-file', filePath);
    expect(res.statusCode).toBe(200);
  });
});
