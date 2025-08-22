import { Injectable, Inject } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { Logger } from 'nestjs-pino';
import { User } from '@/modules/users/domain/entities/user.entity';
import { UserMapper } from '@/modules/users/infrastructure/mappers/user.mapper';
import { CreateUserService } from '@/modules/users/application/use-cases/create-user.service';
import { GetUserByEmailService } from '@/modules/users/application/use-cases/get-user-by-email.service';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(CreateUserService)
    private readonly createUserService: CreateUserService,
    @Inject(GetUserByEmailService)
    private readonly getUserByEmailService: GetUserByEmailService,
    private readonly logger: Logger,
  ) {}

  async execute({ email, password }: RegisterDto): Promise<User> {
    const existingUser = await this.getUserByEmailService.execute(email);
    if (existingUser) {
      this.logger.warn(
        `Registration failed: User with email ${email} already exists.`,
      );
      throw new Error('User with this email already exists.');
    }

    const user = new User(crypto.randomUUID(), email, password);
    await user.setPassword();
    await this.createUserService.execute(user);
    this.logger.log(`User registered successfully: ${user.id}`);
    return UserMapper.toDto(user);
  }
}
