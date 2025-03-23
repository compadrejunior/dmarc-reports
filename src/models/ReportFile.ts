import { Schema, model } from 'mongoose';

export interface ReportFileInterface {
  name: string;
  fullPath: string;
  dateUploaded?: Date;
  dateImported?: Date;
  imported: boolean;
}

const ReportFileSchema = new Schema<ReportFileInterface>({
  name: { type: String, required: true },
  fullPath: { type: String, required: true },
  dateUploaded: { type: Date },
  dateImported: { type: Date },
  imported: { type: Boolean, default: false },
});

export const ReportFile = model('report_files', ReportFileSchema);
