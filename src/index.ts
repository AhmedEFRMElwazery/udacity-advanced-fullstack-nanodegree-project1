import express, { Application, Request, Response } from 'express';
import routes from './routes/routes.main';
import logger from './modules/logger.module';
import path from 'path';

//initiating the application
const app: Application = express();
//defining the default port
const port = 1987;

// main route (http://localhost:1987)
app.get('/', logger, (req: Request, res: Response): void => {
  res.sendFile(
    /**A welcoming webpage is called when first visiting the main url, with
     * guidelines provided on how to use the application.
     **/
    path.resolve('assets/pages/index.html')
  );
});

app.use('/api', routes);

// Start the server listening on the previously stipulated port
app.listen(port, async (): Promise<void> => {
  console.log(
    `Now, you can start browsing the project on http://localhost:${port}`
  );
});

export default app;
