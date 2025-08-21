import { Session } from '../entities/session.entity';
import { SessionUser } from '../entities/session-user.entity';

export interface ISessionRepository {
  // Define methods that the AuthRepository should implement
  create(sessionData: Session): Promise<void>;
  findById(sessionId: string): Promise<SessionUser | null>;
  delete(sessionId: string): Promise<void>;
  deleteAllSessionsByUserId(userId: string): Promise<void>;
  update(sessionId: string, sessionData: Session): Promise<void>;
}

export const SESSION_REPOSITORY = Symbol('SESSION_REPOSITORY');
