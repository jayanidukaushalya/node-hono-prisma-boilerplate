import { createMiddleware } from 'hono/factory';

export const validateUser = createMiddleware(async (c, next) => {
  // make a DB call with
  console.log('User with', c.req.header('accessToken'));

  // if user is not found throw an error

  await next();
});

// For Firebase Auth
// Implement this: https://github.com/honojs/middleware/tree/main/packages/firebase-auth
