import { Injectable, Inject } from '@nestjs/common';
import { SessionService } from '../services/session/session.service';
import { SessionUser } from '../../domain/entities/session-user.entity';
import { UserRepository } from '@/modules/users/infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '@/modules/users/domain/interfaces/user.interface';
import { LoginDto } from '../dto/login.dto';
import { Logger } from 'nestjs-pino';
import { SessionUserMapper } from '../../infrastructure/mappers/session.mapper';

@Injectable()
export class LoginService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(SessionService)
    private readonly sessionService: SessionService,
    private readonly logger: Logger,
  ) {}

  async execute({ email, password }: LoginDto): Promise<SessionUser | null> {
    const user = await this.userRepository.findByEmail(email);

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
