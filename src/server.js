import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constans/saveFiles.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { ENV_VARS } from './constants/index.js';
const PORT = Number(env(ENV_VARS.PORT));

export const startServer = () => {
  const app = express();

  const allowedOrigin = env(ENV_VARS.ALLOWED_ORIGIN);

  app.use(express.json());
  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true,
    }),
  );

  app.options(
    '*',
    cors({
      origin: allowedOrigin,
      credentials: true,
    }),
  );

  app.use(cookieParser());

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(router);

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
