import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { UsersController } from './api/users.controller';
import { USER_REPOSITORY } from './domain/interfaces/user.interface';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { USERS_USE_CASES } from './application/use-cases.index';
import { GuardsModule } from '../../guards/guards.module';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [DatabaseModule, GuardsModule, SessionsModule],
  controllers: [UsersController],
  providers: [
    ...USERS_USE_CASES,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY, ...USERS_USE_CASES],
})
export class UsersModule {}
