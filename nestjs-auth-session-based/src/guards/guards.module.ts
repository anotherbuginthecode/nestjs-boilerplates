import { Module } from '@nestjs/common';
import { SessionAuthGuard } from './session-auth.guard';
import { SessionsModule } from '@/modules/sessions/sessions.module';

@Module({
  imports: [SessionsModule],
  providers: [SessionAuthGuard],
  exports: [SessionAuthGuard],
})
export class GuardsModule {}
