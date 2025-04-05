import { ReportFile, ReportFileInterface } from '../models/ReportFile';
import { MongoDBError } from './MongoDBError';
export class ReportFileRepository {
  private constructor() {}
  /**
   * Sav the file to the database
   * @param file the report file to be saved
   * @returns the new report file document
   */
  public static async save(reportFile: ReportFileInterface) {
    try {
      const newFile = new ReportFile(reportFile);
      await newFile.save();
      return newFile.toObject();
    } catch (error) {
      MongoDBError.handle(error);
    }
  }

  /**
   * Delete a report file from the databae
   * @param filename the name of the file to be deleted
   * @returns the delete operation result
   */
  public static async delete(filename: string) {
    try {
      const result = await ReportFile.deleteOne({ filename: filename });
      return result;
    } catch (error) {
      MongoDBError.handle(error);
    }
  }

  /**
   * Get a file by its name
   * @param filename the name of the file to get
   * @returns the found report file
   */
  public static async getFile(filename: string) {
    try {
      const result = await ReportFile.findOne({ filename });
      return result;
    } catch (error) {
      MongoDBError.handle(error);
    }
  }

  /**
   * Get all report files from database
   * @returns an array containing all report files
   */
  public static async getAllFiles() {
    try {
      const result = await ReportFile.find({});
      return result;
    } catch (error) {
      MongoDBError.handle(error);
    }
  }
}
