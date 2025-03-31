import * as db from '../db/db';
import { ReportFile } from '../../models/ReportFile';

describe('ReportFile', () => {
  beforeAll(async () => {
    await db.connect();
  });
  beforeEach(async () => await db.clear());
  afterAll(async () => {
    await db.close();
  });
  it('should create a new ReportFile and save it to the database.', async () => {
    const reportFile = new ReportFile({
      originalname: 'test.txt',
      path: '/d/temp/test.txt',
      dateUploaded: Date.now(),
    });
    const newReportFile = await reportFile.save();
    expect(newReportFile).toBeDefined();
    expect(newReportFile).not.toBeNull();
    expect(newReportFile.originalname).toBe('test.txt');
  });
});
