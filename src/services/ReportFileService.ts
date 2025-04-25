import fs from 'fs';
import { filetypeinfo } from 'magic-bytes.js';
import { ReportFileRepository } from '../db/ReportFileRepository';
import { ReportFileInterface } from '../models/ReportFile';
import FileUtils from '../utils/FileUtils';

export interface DeleteFileOutput {
  deletedFromServer: boolean;
  deletedFromDatabase: {
    acknowledged: boolean;
    deletedCount: number;
  };
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
  public static async saveFileToDatabase(
    file: ReportFileInterface
  ): Promise<ReportFileInterface> {
    const result = await ReportFileRepository.save(file);
    return result;
  }

  /**
   * Validate if file content is application/xml
   * @param buffer the file in memory
   * @returns boolean
   */
  public static async isValidFileType(filePath: string): Promise<boolean> {
    console.log('[ReportFileService.ts] filePath=' + filePath);
    const buffer = fs.readFileSync(filePath);
    const [type] = filetypeinfo(buffer);
    const allowedTypes = ['application/xml'];
    console.log('[ReportFileService.ts] type.mime=' + type.mime);
    if (type && type.mime && allowedTypes.includes(type.mime)) return true;
    return false;
  }

  /**
   * Delete a file from database and server
   * @param fileName file to delete
   * @returns the delete operation result or
   * null.
   */
  public static async deleteFile(id: string): Promise<DeleteFileOutput | null> {
    const file = await ReportFileRepository.getFile(id);
    if (file) {
      const deletedFromServer = await FileUtils.deleteFile(file.path);
      const deletedFromDatabase = await ReportFileRepository.delete(id);
      return {
        deletedFromServer,
        deletedFromDatabase,
      };
    }
    return null;
  }

  /**
   * Retrieve all report files
   * @returns list of report files
   */
  public static async listAll(): Promise<ReportFileInterface[]> {
    const result = await ReportFileRepository.getAllFiles();
    return result;
  }

  /**
   * Get a single report file
   * @param id report file id
   * @returns the report file object
   */
  public static async getFile(id: string): Promise<ReportFileInterface | null> {
    const result = await ReportFileRepository.getFile(id);
    return result;
  }
}
