import { Schema, model } from 'mongoose';

export interface ReportFileInterface {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  dateUploaded?: Date;
  dateImported?: Date;
  status?: string;
}

const ReportFileSchema = new Schema<ReportFileInterface>({
  fieldname: { type: String },
  originalname: { type: String },
  encoding: { type: String },
  mimetype: { type: String },
  destination: { type: String },
  filename: { type: String },
  path: { type: String },
  size: { type: Number },
  dateUploaded: { type: Date, default: Date.now },
  dateImported: { type: Date },
  status: { type: String, default: 'pending' },
});

export const ReportFile = model('report_files', ReportFileSchema);
