import { serve } from '@hono/node-server';
import app from './config/app.config';
import connect from './config/db.config';
import environment from './config/env.config';

const startServer = async () => {
  try {
    await connect();

    serve({
      fetch: app.fetch,
      port: environment.port
    });

    console.log(
      `🌍 [${environment.packageName}:${environment.env}] is running on port ${environment.port}`
    );
  } catch (error) {
    console.error('unable to start the API', error);
    process.exit(1);
  }
};

startServer();
