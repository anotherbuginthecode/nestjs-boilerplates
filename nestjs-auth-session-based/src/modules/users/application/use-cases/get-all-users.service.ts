import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '@/modules/users/infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '@/modules/users/domain/interfaces/user.interface';
import { User } from '@/modules/users/domain/entities/user.entity';
import { Logger } from 'nestjs-pino';

@Injectable()
export class GetAllUsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(): Promise<User[]> {
    this.logger.log(`Fetching all users`);
    const users = await this.userRepository.findAll();
    return users;
  }
}
