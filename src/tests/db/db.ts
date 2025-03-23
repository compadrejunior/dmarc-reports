import mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

// Provide connection to a new in-memory database server.
export const connect = async () => {
  // NOTE: before establishing a new connection close previous
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
};

// Remove and close the database and server.
export const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
};

// Remove all data from collections
export const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
};
