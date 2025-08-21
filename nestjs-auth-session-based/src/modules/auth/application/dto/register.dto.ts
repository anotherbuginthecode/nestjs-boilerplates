import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RegisterDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class RegisterDto extends createZodDto(RegisterDtoSchema) {}
