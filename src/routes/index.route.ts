import { Router, Request, Response, NextFunction } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ status: 'OK', message: 'Server is working' });
});
export default routes;
