import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { ENVIRONMENTS } from '../constants';
import { VERSION } from '../version';

const env = config();
dotenvExpand.expand(env);

const environment = {
  isDebugMode:
    process.env.NODE_ENV === ENVIRONMENTS.DEV || process.env.NODE_ENV === ENVIRONMENTS.TEST,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
  env: process.env.NODE_ENV as ENVIRONMENTS,
  packageName: process.env.PACKAGE_NAME as string,
  packageVersion: VERSION,
  databaseURI: process.env.DATABASE_URL as string,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  accessTokenExpiration: Math.floor(Date.now() / 1000) + 5 * 60, // 5 minutes
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  refreshTokenExpiration: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 days
};

export default environment;
