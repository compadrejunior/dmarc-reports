import { Router, Request, Response, NextFunction } from 'express';
import Upload from '../middlewares/Upload';

class UploadRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    // Single file upload (field name: 'file')
    this.router.post(
      '/',
      Upload.single('report-file'), // Multer middleware
      (req: Request, res: Response, next: NextFunction): void => {
        if (!req.file) {
          res.status(400).send('No file uploaded.');
          return;
        }
        res.json({
          message: 'File uploaded successfully!',
          file: req.file, // Typed as `Express.Multer.File`
        });
      }
    );
  }
}

export default new UploadRoute().router;
