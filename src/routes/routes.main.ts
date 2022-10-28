import express, { Router, Request, Response } from 'express';
import path from 'path';
import logger from '../modules/logger.module';
import imageEndpoint from './api/image.endpoint';

const routes: Router = express.Router();

routes.use('/v1/processimage', imageEndpoint);

routes.get('/', logger, (req: Request, res: Response): void => {
  res.sendFile(path.resolve('assets/pages/index.html'));
});

export default routes;
