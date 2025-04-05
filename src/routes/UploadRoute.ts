import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import ReportFileService from '../services/ReportFileService';
import { BaseRoute } from './BaseRoute';
import FileUtils from '../utils/FileUtils';

export default class UploadFileRoute extends BaseRoute {
  setupRoutes() {
    this.router.post('/', this.upload, async (req, res): Promise<void> => {
      console.log('req.file=' + JSON.stringify(req.file));
      if (!req.file) {
        res.status(400).json({
          error: { status: 400, message: 'Report file missing' },
        });
        return;
      }
      const { file } = req;
      if (file) {
        if (!(await ReportFileService.isValidFileType(file.path))) {
          res.status(400).json({
            error: {
              status: 400,
              message: 'Invalid file type. Required application/xml',
            },
          });
          await FileUtils.deleteFile(file.path);
          return;
        }
        const result = await ReportFileService.saveFileToDatabase(file);
        res.json(result);
      }
    });
  }

  // private middleware
  private upload(req: Request, res: Response, next: NextFunction): void {
    const upload = multer({ dest: './data/upload' }).single('report-file');
    upload(req, res, async (error) => {
      if (error) {
        res.status(500).json({
          error: { status: 500, message: 'File upload error: ' + error },
        });
        return;
      }
      next(error);
    });
  }
}
