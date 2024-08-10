import { Hono } from 'hono';

import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import { showRoutes } from 'hono/dev';
import { logger } from 'hono/logger';
import { HonoEnv } from '../@types/hono/generics';
import rootApp from '../handlers';
import cats from '../handlers/v1/cats';
import { globalErrorHandler } from '../middlewares/global-error-handler.middleware';
import { successResponseHandler } from '../middlewares/success-response-handler.middleware';

const app = new Hono<HonoEnv>();

// middlewares
app.use(
  cors({
    // add the allowed origins, methods and headers here
    origin: '*',
    allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'x-api-key'
    ]
  })
);
app.use(compress());
app.use(logger());

app.use(successResponseHandler);

// routes
app.route('/v1/cats', cats);
app.route('/', rootApp);

app.onError(globalErrorHandler);

showRoutes(app);

export default app;
