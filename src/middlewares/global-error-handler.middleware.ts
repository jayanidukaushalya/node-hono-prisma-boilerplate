import { Context } from 'hono';
import { ErrorHandler, HTTPResponseError } from 'hono/types';
import { HonoEnv } from '../@types/hono/generics';

export const globalErrorHandler: ErrorHandler<HonoEnv> = (
  error: Error | HTTPResponseError,
  c: Context
) => {
  console.error('Error:', error.message);
  return c.json({
    message: error.message || 'Internal Server Error'
  });
};
