import express, { Request, Response, Router } from 'express';

const imageAPI: Router = express.Router();

imageAPI.get('/', (req: Request, res: Response) => {
  console.log('Image Processing has been called');

  console.log(req.query);
  res.send('Image Processing has been called');
});

export default imageAPI;
