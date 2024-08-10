import { Hono } from 'hono';
import { HonoEnv } from '../@types/hono/generics';
import environment from '../config/env.config';
import { ERROR_MESSAGES } from '../constants/error.constants';
import NotFoundException from '../exceptions/not-found.exception';

const rootApp = new Hono<HonoEnv>();

rootApp.get('/health', (c) => {
  return c.json({
    message: 'Welcome to the Hono API',
    version: environment.packageVersion,
    environment: environment.env
  });
});

rootApp.all('*', (c) => {
  c.status(404);
  throw new NotFoundException(ERROR_MESSAGES.ROUTE_NOT_FOUND);
});

export default rootApp;
