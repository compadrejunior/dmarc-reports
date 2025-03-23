import { Schema, model } from 'mongoose';

/**
 * A record inside a DMARC report
 */
export interface ReportRecordInterface {
  /** Reference to the Report */
  report: String;
  /** The IP address of the sending server. */
  sourceIP: string;
  /** The number of messages from this source IP. */
  count: Number;
  /** The action taken (none, quarantine, reject). */
  disposition: string;
  /** The results of DKIM and SPF checks. */
  authResults: {
    dkim: { domain: string; result: string };
    spf: { domain: string; result: string };
  };
}

export const ReportRecordSchema = new Schema<ReportRecordInterface>({
  report: { type: Schema.Types.ObjectId, ref: 'reports', required: true },
  sourceIP: { type: String },
  count: { type: Number },
  disposition: { type: String },
  authResults: {
    dkim: {
      domain: { type: String },
      result: { type: String },
    },
    spf: {
      domain: { type: String },
      result: { type: String },
    },
  },
});

export const ReportRecord = model('records', ReportRecordSchema);
