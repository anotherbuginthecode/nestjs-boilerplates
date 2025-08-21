import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { AuthController } from './api/auth.controller';
import { AuthService } from './application/services/auth.service';
import { SessionRepository } from './infrastructure/repositories/session.repository';
import { SESSION_REPOSITORY } from './domain/interfaces/session.interface';
import { AUTH_USE_CASES } from './application/use-cases/use-cases.index';
import { UsersModule } from '../users/users.module';
import { SessionService } from './application/services/session/session.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AuthController],
  providers: [
    ...AUTH_USE_CASES,
    AuthService,
    SessionService,
    {
      provide: SESSION_REPOSITORY,
      useClass: SessionRepository,
    },
  ],
})
export class AuthModule {}
