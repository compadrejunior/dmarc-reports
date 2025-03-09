import dotenv from 'dotenv';
import app from './app';
import db from './db/MongoDB';
import { Logger } from './utils/Logger';

// Load environment variables
dotenv.config();

// Connect Database
db.connect().catch((err) => {
  Logger.Error(`Server Error: ${err.message}`);
});

// Starts the server listener
const port = process.env.SERVER_PORT || 5000;
const domain = process.env.SERVER_HOST;
const server = app.listen(port, () => {
  Logger.Info(`Listening at http://${domain}:${port}`);
});

process.on('uncaughtException', (error) => {
  console.error(`Server Error: ${error.message}`);
  server.close();
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT: closing HTTP server');
  server.close(() => {
    console.log('Server is closed. Bye!');
  });
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('Server is closed. Bye!');
  });
  process.exit(0);
});
