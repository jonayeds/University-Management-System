import express, { Application,  Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import { router } from './app/routes';
export const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1', router);


export default app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler)

// Not found route
app.use(notFound)
