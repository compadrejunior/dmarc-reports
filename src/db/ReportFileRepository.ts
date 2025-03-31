import { ReportFile, ReportFileInterface } from '../models/ReportFile';
import { MongoDBError } from './MongoDBError';
export class ReportFileRepository {
  private constructor() {}
  public static async save(file: ReportFileInterface) {
    try {
      const newFile = new ReportFile(file);
      await newFile.save();
      return newFile.toObject();
    } catch (error) {
      MongoDBError.handle(error);
    }
  }
}
