import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import Index from './routes/Index';

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
// app.use('/api/deck', DeckRoute);
// app.use('/api/card', CardRoute);

// Error Middleware
// app.use(errorHandler);

export default app;
