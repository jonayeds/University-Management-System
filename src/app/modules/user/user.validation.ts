import { z } from 'zod';
import { User_Status } from './user.constant';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be String' })
    .min(8, { message: 'Password cannot be less than 6 characters' })
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(User_Status as [string]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
