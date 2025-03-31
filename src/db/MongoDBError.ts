export interface MongoError extends Error {
  code?: number;
  keyValue?: Record<string, any>;
  errors?: Record<string, Error>;
}

export class MongoDBError {
  private constructor() {}
  public static handle(error: unknown): never {
    const mongoError = error as MongoError;

    if (mongoError.name === 'ValidationError') {
      throw new Error(
        `Validation failed: ${Object.values(mongoError.errors!)
          .map((e) => e.message)
          .join(', ')}`
      );
    }

    if (mongoError.code === 11000) {
      const [[key, value]] = Object.entries(mongoError.keyValue!);
      throw new Error(
        `Duplicate key: ${key} with value ${value} already exists`
      );
    }

    throw mongoError;
  }
}
