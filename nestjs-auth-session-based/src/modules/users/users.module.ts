import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { UsersController } from './api/users.controller';
import { USER_REPOSITORY } from './domain/interfaces/user.interface';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule {}
