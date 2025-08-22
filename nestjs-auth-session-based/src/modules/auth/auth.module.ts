import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { AuthController } from './api/auth.controller';
import { AuthService } from './application/auth.service';
import { AUTH_USE_CASES } from './application/use-cases/use-cases.index';
import { UsersModule } from '../users/users.module';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [DatabaseModule, SessionsModule, UsersModule],
  controllers: [AuthController],
  providers: [...AUTH_USE_CASES, AuthService],
})
export class AuthModule {}
