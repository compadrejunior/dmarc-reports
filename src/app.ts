import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import Index from './routes/index.route';
import UploadFileRoute from './routes/UploadRoute';
import { multerErrorHandler } from './middlewares/MulterErrorHandler';
import ReportFileRoute from './routes/ReportFileRoute';

// deepcode ignore UseCsurfForExpress: running in private network
const app = express();

// Init Parser Middleware
app.use(express.json());

// Disable technologies used by the webserver.
// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html#x-powered-by
app.disable('x-powered-by');

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Register routes
app.use('/', Index);
const uploadRoute = new UploadFileRoute();
app.use('/api/upload', uploadRoute.getRouter());
const reportFileRoute = new ReportFileRoute();
app.use('/api/report-file', reportFileRoute.getRouter());

export default app;
