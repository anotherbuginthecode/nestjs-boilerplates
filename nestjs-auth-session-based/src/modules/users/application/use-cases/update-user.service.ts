import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '@/modules/users/infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '@/modules/users/domain/interfaces/user.interface';
import { User } from '@/modules/users/domain/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Logger } from 'nestjs-pino';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, user: UpdateUserDto): Promise<User | null> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      this.logger.warn(`User with id: ${id} not found`);
      throw new NotFoundException('User not found');
    }
    this.logger.log(`Updating info for user with id: ${id}`);
    if (user.email) {
      existingUser.email = user.email;
    }
    if (user.password) {
      existingUser.password = user.password;
      existingUser.setPassword();
    }

    await this.userRepository.update(existingUser);
    return existingUser;
  }
}
