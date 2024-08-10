import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { commonValidationHook } from '../utils/validation.utils';

export const getAllCatsQueryValidator = zValidator(
  'query',
  z.object({
    name: z.string().min(3)
  }),
  commonValidationHook
);
