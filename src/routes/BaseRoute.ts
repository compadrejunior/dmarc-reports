import { Router, Request, Response, NextFunction } from 'express';

export abstract class BaseRoute {
  protected router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  abstract setupRoutes(): void;

  getRouter(): Router {
    return this.router;
  }

  // Example reusable middleware
  protected logRequest(req: Request, res: Response, next: NextFunction) {
    console.log(`[${req.method}] ${req.path}`);
    next();
  }

  protected middleware: ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => void)[] = [];

  addMiddleware(
    middleware: (req: Request, res: Response, next: NextFunction) => void
  ) {
    this.middleware.push(middleware);
  }
}
