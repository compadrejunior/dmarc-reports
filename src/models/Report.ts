import { Schema, model } from 'mongoose';
import { ReportRecordInterface, ReportRecordSchema } from './ReportRecord';

/**
 * Represents a DMARC report object structure
 */
export interface ReportInterface {
  /** Unique identifier for the report. */
  reportID: string;
  /** The name of the organization generating the report. */
  organizationName: string;
  /** Contact email for the organization. */
  organizationEmail: string;
  /** The Report start date and time */
  begin: Date;
  /** The Report end date and time */
  end: Date;
  /** The domain for which the policy is applicable. */
  domain: string;
  /** Alignment mode for DKIM. */
  adkim: string;
  /** Alignment mode for SPF. */
  aspf: string;
  /** The policy applied (none, quarantine, reject). */
  policy: string;
  /** Specifies the policy that should be followed for subdomains. */
  subdomainPolicy?: String;
  /** The pct tag specifies the percentage of emails that should be subjected to filtering. */
  percentage?: number;
  /** The report records */
  records: ReportRecordInterface[];
}

const ReportSchema = new Schema<ReportInterface>({
  reportID: { type: String, required: true, unique: true },
  organizationName: { type: String },
  organizationEmail: { type: String },
  begin: { type: Date },
  end: { type: Date },
  domain: { type: String },
  adkim: { type: String },
  aspf: { type: String },
  policy: { type: String },
  subdomainPolicy: { type: String },
  percentage: { type: Number },
  records: { type: [ReportRecordSchema] },
});

export const Report = model('reports', ReportSchema);
