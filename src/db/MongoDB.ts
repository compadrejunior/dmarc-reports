// Import public libraries
import mongoose from 'mongoose';
import { Logger } from '../utils/Logger';

const DB = {
  connect: async () => {
    const MONGODB_USER = process.env.MONGODB_USER;
    const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
    const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
    const MONGODB_HOST = process.env.MONGODB_HOST;
    const MONGODB_PORT = process.env.MONGODB_PORT;
    const MONGO_URI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
    try {
      if (MONGO_URI === null || MONGO_URI === undefined) {
        Logger.Error(`Server Error: MONGO_URI is not defined`);
        process.exit(1);
      }
      await mongoose.connect(MONGO_URI);
      Logger.Info(`Connected to MongoDB`);
    } catch (error) {
      Logger.Error(`Server Error: ${error}`);
      // Exist process with failure on production
      process.exit(1);
    }
  },
  disconnect: async () => {
    try {
      await mongoose.disconnect();
      Logger.Info('👋 Bye! Disconnected from the database.');
    } catch (error) {
      Logger.Error(`Error disconnecting from the database: ${error}`);
      process.exit(1);
    }
  },
};

export default DB;
