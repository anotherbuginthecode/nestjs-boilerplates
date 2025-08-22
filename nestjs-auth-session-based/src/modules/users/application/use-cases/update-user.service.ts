import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '@/modules/users/infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '@/modules/users/domain/interfaces/user.interface';
import { User } from '@/modules/users/domain/entities/user.entity';
import { Logger } from 'nestjs-pino';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(user: User): Promise<User | null> {
    this.logger.log(`Updating info for user with id: ${user.id}`);
    await this.userRepository.update(user);
    return user;
  }
}
