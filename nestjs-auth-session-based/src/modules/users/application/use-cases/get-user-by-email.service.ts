import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '@/modules/users/infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '@/modules/users/domain/interfaces/user.interface';
import { User } from '@/modules/users/domain/entities/user.entity';
import { Logger } from 'nestjs-pino';

@Injectable()
export class GetUserByEmailService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(email: string): Promise<User | null> {
    this.logger.log(`Fetching user with email: ${email}`);
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.logger.warn(`User not found with ID: ${email}`);
      return null;
    }
    return user;
  }
}
