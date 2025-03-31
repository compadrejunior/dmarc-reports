import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import UploadFileService from '../services/UploadFileService';
import { BaseRoute } from './BaseRoute';

export default class UploadFileRoute extends BaseRoute {
  setupRoutes() {
    this.router.post('/', this.upload, async (req, res) => {
      console.log('req.file=' + JSON.stringify(req.file));
      if (!req.file) {
        res.status(400).json({
          error: { status: 400, message: 'Report file missing' },
        });
        return;
      }
      const { file } = req;
      const result = await UploadFileService.saveFileToDatabase(file);
      res.json(result);
      return;
    });
  }

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
