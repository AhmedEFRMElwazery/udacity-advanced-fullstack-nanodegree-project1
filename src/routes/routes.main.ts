import express, { Router, Request, Response } from 'express';
import imageAPI from './API/image';

const routesMainGateway: Router = express.Router();

routesMainGateway.get('/', (req: Request, res: Response) => {
  console.log('main routes has been called');
  res.send('main routes has been called');
});

routesMainGateway.use('/imageProcessingAPI', imageAPI);

export default routesMainGateway;
