import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@/modules/users/domain/interfaces/user.interface';
import { UserRepository } from '@/modules/users/infrastructure/repositories/user.repository';
import { RegisterDto } from '../dto/register.dto';
import { Logger } from 'nestjs-pino';
import { User } from '@/modules/users/domain/entities/user.entity';
import { UserMapper } from '@/modules/users/infrastructure/mappers/user.mapper';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute({ email, password }: RegisterDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      this.logger.warn(
        `Registration failed: User with email ${email} already exists.`,
      );
      throw new Error('User with this email already exists.');
    }

    const user = new User(crypto.randomUUID(), email, password);
    await user.setPassword();
    await this.userRepository.create(user);
    this.logger.log(`User registered successfully: ${user.id}`);
    return UserMapper.toDto(user);
  }
}
