import { Injectable, Inject } from '@nestjs/common';
import { SessionRepository } from '../infrastructure/repositories/session.repository';
import { SESSION_REPOSITORY } from '../domain/interfaces/session.interface';
import { Session } from '../domain/entities/session.entity';
import { SessionUser } from '../domain/entities/session-user.entity';
import { sha256 } from '@oslojs/crypto/sha2';
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';

@Injectable()
export class SessionService {
  async getUserFromSession(sessionId: string): Promise<SessionUser | null> {
    const result = await this.sessionRepository.findById(sessionId);
    if (!result) return null;
    return result;
  }
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
  ) {}

  generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
  }

  async createSession(token: string, userId: string): Promise<Session> {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );
    const session = new Session(
      sessionId,
      userId,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    );
    await this.sessionRepository.create(session);
    return session;
  }

  async validateSessionToken(token: string): Promise<SessionUser | null> {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );
    const result: SessionUser =
      await this.sessionRepository.findById(sessionId);
    if (!result) {
      return { session: null, user: null };
    }
    const { user, session } = result[0];
    if (Date.now() >= session.expiresAt.getTime()) {
      await this.sessionRepository.delete(session.id);
      return { session: null, user: null };
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
      session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
      this.sessionRepository.update(session.id, session);
    }
    return { session, user };
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await this.sessionRepository.delete(sessionId);
  }

  async invalidateAllSessions(userId: string): Promise<void> {
    await this.sessionRepository.deleteAllSessionsByUserId(userId);
  }
}
