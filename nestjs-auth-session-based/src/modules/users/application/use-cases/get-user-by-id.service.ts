import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '@/modules/users/infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '@/modules/users/domain/interfaces/user.interface';
import { User } from '@/modules/users/domain/entities/user.entity';
import { Logger } from 'nestjs-pino';

@Injectable()
export class GetUserByIdService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(userId: string): Promise<User | null> {
    this.logger.log(`Fetching user with ID: ${userId}`);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      this.logger.warn(`User not found with ID: ${userId}`);
      return null;
    }
    return user;
  }
}
