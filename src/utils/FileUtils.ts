import { unlink } from 'fs/promises';
export default class FileUtils {
  public static async deleteFile(filePath: string) {
    try {
      await unlink(filePath);
      return true;
    } catch {
      console.error('Error deleting file: ' + filePath);
    }
    return false;
  }
}
