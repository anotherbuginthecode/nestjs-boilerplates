import { Injectable, Inject } from '@nestjs/common';
import { SessionService } from '../../../sessions/applications/session.service';
import { SessionUser } from '../../../sessions/domain/entities/session-user.entity';
import { GetUserByEmailService } from '@/modules/users/application/use-cases/get-user-by-email.service';
import { LoginDto } from '../dto/login.dto';
import { Logger } from 'nestjs-pino';
import { SessionUserMapper } from '@/modules/sessions/infrastructure/mappers/session.mapper';

@Injectable()
export class LoginService {
  constructor(
    @Inject(GetUserByEmailService)
    private readonly userService: GetUserByEmailService,
    @Inject(SessionService)
    private readonly sessionService: SessionService,
    private readonly logger: Logger,
  ) {}

  async execute({ email, password }: LoginDto): Promise<SessionUser | null> {
    const user = await this.userService.execute(email);

    if (!user || !(await user.comparePassword(password, user.password))) {
      this.logger.warn(`Login failed for email: ${email}`);
      throw new Error('Invalid email or password');
    }

    const sessionToken = this.sessionService.generateSessionToken();
    const session = await this.sessionService.createSession(
      sessionToken,
      user.id,
    );

    return SessionUserMapper.toDomain({ session, user });
  }
}
