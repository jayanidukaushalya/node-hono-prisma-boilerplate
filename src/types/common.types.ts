import { JWTPayload } from 'hono/utils/jwt/types';

export interface IJwtPayload extends JWTPayload {
  userId: string;
  userType: string;
}
