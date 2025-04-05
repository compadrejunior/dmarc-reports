import { loadEsm } from 'load-esm';
import { ReportFileRepository } from '../db/ReportFileRepository';
import { ReportFileInterface } from '../models/ReportFile';
import FileUtils from '../utils/FileUtils';

export interface DeleteFileOutput {
  deletedFromServer: string;
  deletedFromDatabase: string;
}

export default class ReportFileService {
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

  /**
   * Validate if file content is application/xml
   * @param buffer the file in memory
   * @returns boolean
   */
  public static async isValidFileType(filePath: string): Promise<boolean> {
    const { fileTypeFromFile } = await loadEsm<typeof import('file-type')>(
      'file-type'
    );
    const type = await fileTypeFromFile(filePath);
    const allowedTypes = ['application/xml'];
    if (!type || !allowedTypes.includes(type.mime)) {
      return false;
    }
    return true;
  }

  /**
   * Delete a file from database and server
   * @param fileName file to delete
   * @returns the delete operation result or
   * null.
   */
  public static async deleteFile(fileName: string) {
    const file = await ReportFileRepository.getFile(fileName);
    if (file) {
      const deletedFromServer = await FileUtils.deleteFile(file.path);
      const deletedFromDatabase = await ReportFileRepository.delete(
        file.filename
      );
      return {
        deletedFromServer,
        deletedFromDatabase,
      };
    }
    return null;
  }

  public static async listAll() {
    const result = await ReportFileRepository.getAllFiles();
    return result;
  }
}
