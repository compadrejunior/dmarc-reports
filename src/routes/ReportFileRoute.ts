import { Router } from 'express';
import ReportFileService from '../services/ReportFileService';

class ReportFileRoute {
  public router: Router;
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }
  private setupRoutes() {
    //Delete report file route
    this.router.delete('/:id', async (req, res): Promise<void> => {
      const { id } = req.params;
      const result = await ReportFileService.deleteFile(id);
      if (!result) {
        res.status(404).json({
          status: 404,
          message: 'File not found',
        });
        return;
      }
      res.json(result);
      return;
    });

    // List report file route
    this.router.get('/', async (req, res): Promise<void> => {
      const result = await ReportFileService.listAll();
      res.json(result);
    });

    // Get single report file route
    this.router.get('/:filename', async (req, res): Promise<void> => {
      const { filename } = req.params;
      const result = await ReportFileService.getFile(filename);
      res.json(result);
    });
  }
}
export default new ReportFileRoute().router;
