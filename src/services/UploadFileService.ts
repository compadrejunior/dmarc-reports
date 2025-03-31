import { ReportFileRepository } from '../db/ReportFileRepository';
import { ReportFileInterface } from '../models/ReportFile';

export default class UploadFileService {
  private constructor() {}
  /**
   * Save file metadata to the database.
   * @param name the file name
   * @param size the file size
   * @returns the database file document as JSON object.
   * @throws MongoError
   */
  public static async saveFileToDatabase(file: ReportFileInterface) {
    const result = await ReportFileRepository.save(file);
    return result;
  }
}
