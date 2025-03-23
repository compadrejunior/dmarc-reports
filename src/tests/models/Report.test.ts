import * as db from '../db/db';
import { Report } from '../../models/Report';

describe('Report', () => {
  beforeAll(async () => {
    await db.connect();
  });
  beforeEach(async () => await db.clear());
  afterAll(async () => {
    await db.close();
  });
  it('should create a new Report and save it to the database.', async () => {
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
    const result = await report.save();
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result.reportID).toBe('1234');
  });
});
