import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

// Zod schema for updating user info
export const UpdateUserDtoSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).max(100).optional(),
});

export class UpdateUserDto extends createZodDto(UpdateUserDtoSchema) {}
