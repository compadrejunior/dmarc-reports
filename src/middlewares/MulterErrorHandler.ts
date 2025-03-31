import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { MulterError } from 'multer';

// Custom type for Multer file size errors (optional but improves clarity)
interface MulterFileSizeError extends Error {
  code?: string;
}

export const multerErrorHandler: ErrorRequestHandler = (
  err: MulterFileSizeError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(413).send('File too large (max 10MB)');
    }
    // Handle other Multer errors (optional)
    res.status(400).send(`File upload error: ${err.message}`);
  }

  // Handle generic errors
  res.status(500).send('Internal server error');

  next(err);
};
