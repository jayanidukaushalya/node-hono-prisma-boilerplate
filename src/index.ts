import { serve } from '@hono/node-server';
import app from './config/app.config';
import prisma from './config/db.config';
import environment from './config/env.config';

const startServer = async () => {
  try {
    serve({
      fetch: app.fetch,
      port: environment.port
    });

    prisma
      .$connect()
      .then(async () => {
        console.log('🛢️  Database connection established successfully!');
      })
      .catch((error) => {
        console.error('😕  Failed to connect to the database:', error);
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
