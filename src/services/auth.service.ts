import bcrypt from 'bcrypt';
import { sign, verify } from 'hono/jwt';
import { JwtTokenExpired } from 'hono/utils/jwt/types';
import environment from '../config/env.config';
import { IJwtPayload } from '../types/common.types';

const generateAccessToken = (userId: string) => {
  return sign({ userId, exp: environment.accessTokenExpiration }, environment.accessTokenSecret);
};

const generateRefreshToken = (userId: string) => {
  return sign({ userId, exp: environment.refreshTokenExpiration }, environment.refreshTokenSecret);
};

const verifyAccessToken = async (token: string) => {
  try {
    const decoded = (await verify(token, environment.accessTokenSecret)) as IJwtPayload;
    return { decodedToken: decoded, error: null };
  } catch (error) {
    if (error instanceof JwtTokenExpired) {
      return { decodedToken: null, error: 'expired' };
    }

    return { decodedToken: null, error: 'invalid' };
  }
};

const verifyRefreshToken = async (token: string) => {
  try {
    const decoded = (await verify(token, environment.refreshTokenSecret)) as IJwtPayload;
    return { decodedToken: decoded, error: null };
  } catch (error) {
    if (error instanceof JwtTokenExpired) {
      return { decodedToken: null, error: 'expired' };
    }

    return { decodedToken: null, error: 'invalid' };
  }
};

const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
};

const comparePassword = (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashPassword,
  comparePassword
};
