import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

// Define allowed file types
const allowedMimes = ['application/xml'] as const;
type AllowedMime = (typeof allowedMimes)[number];

// Configure Multer storage (save to disk)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'data/upload/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// File filter (validate MIME types)
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (allowedMimes.includes(file.mimetype as AllowedMime)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only XML is allowed.'));
  }
};

// Configure Multer
const Upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export default Upload;
