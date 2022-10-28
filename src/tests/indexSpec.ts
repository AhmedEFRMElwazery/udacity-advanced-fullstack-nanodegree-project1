import supertest, { Response } from 'supertest';
import app from '../index';

const req: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Testing endpoints: ', (): void => {
  it('should get status code (200) at valid endpoint 1: /', async (): Promise<void> => {
    const res: Response = await req.get('/');
    expect(res.status).toBe(200);
  });

  it('should get status code (200) at valid endpoint 2: /api', async (): Promise<void> => {
    const res: Response = await req.get('/api');
    expect(res.status).toBe(200);
  });

  it('should get status code (404) for an invalid endpoint: /jarvis', async (): Promise<void> => {
    const res: Response = await req.get('/jarvis');
    expect(res.status).toBe(404);
  });

  it('should get status code (200) with valid parameters at /api/v1/processimage?imageName=santamonica&desiredWidth=900&desiredHeight=700', async (): Promise<void> => {
    const res: Response = await req.get(
      '/api/v1/processimage?imageName=santamonica&desiredWidth=900&desiredHeight=700'
    );
    expect(res.status).toBe(200);
  });
});
