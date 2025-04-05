import ReportFileService, {
  DeleteFileOutput,
} from '../services/ReportFileService';
import { BaseRoute } from './BaseRoute';

export default class ReportFileRoute extends BaseRoute {
  setupRoutes() {
    this.router.delete('/:filename', async (req, res): Promise<void> => {
      const { filename } = req.params;
      const result = await ReportFileService.deleteFile(filename);
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
    this.router.get('/', async (req, res): Promise<void> => {
      const result = await ReportFileService.listAll();
      res.json(result);
    });
  }
}
