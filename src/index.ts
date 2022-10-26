import express, { Application } from 'express';
import routesMainGateway from './routes/routes.main';

const app: Application = express();
const port = 1987;

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('API has been called');
  res.send('API has been called');
});

app.use('/v1', routesMainGateway);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
