import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { SESSION_REPOSITORY } from './domain/interfaces/session.interface';
import { SessionRepository } from './infrastructure/repositories/session.repository';
import { SessionService } from './applications/session.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    SessionService,
    {
      provide: SESSION_REPOSITORY,
      useClass: SessionRepository,
    },
  ],
  exports: [SessionService],
})
export class SessionsModule {}
