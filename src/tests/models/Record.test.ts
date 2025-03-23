import * as db from '../db/db';
import { Report } from '../../models/Report';
import { ReportRecord } from '../../models/ReportRecord';

describe('ReportRecord', () => {
  beforeAll(async () => {
    await db.connect();
  });
  beforeEach(async () => await db.clear());
  afterAll(async () => {
    await db.close();
  });
  it('should create a new ReportRecord and save it to the database.', async () => {
    const report = new Report({
      reportID: '1234',
      domain: 'myorganization.com',
      organizationName: 'My Organization',
      organizationEmail: 'email@myorganization.com',
      begin: new Date('2025-03-22T00:00:00Z'),
      end: new Date('2025-03-22T23:59:59Z'),
      adkim: 'r',
      aspf: 'r',
      policy: 'none',
    });
    const newReport = await report.save();
    expect(newReport).toBeDefined();
    expect(newReport).not.toBeNull();
    expect(newReport.reportID).toBe('1234');

    const record = new ReportRecord({
      report: newReport._id,
      count: 1,
      sourceIP: '10.0.0.1',
      authResults: {
        dkim: { domain: 'example.com', result: 'pass' },
        spf: { domain: 'example.com', result: 'pass' },
      },
    });
    const newRecord = await record.save();
    expect(newRecord).toBeDefined();
    expect(newRecord).not.toBeNull();
    expect(newRecord.report).toBe(newReport._id);
  });
});
