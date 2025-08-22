import { Session } from '../../domain/entities/session.entity';
import { SessionUser } from '../../domain/entities/session-user.entity';

export class SessionMapper {
  static toDomain(row: any): Session {
    if (!row) return null;
    return new Session(row.id, row.userId, row.expiresAt);
  }

  static toPersistence(session: Session): any {
    return {
      id: session.id,
      userId: session.getUserId(),
      expiresAt: session.expiresAt,
    };
  }
}

export class SessionUserMapper {
  static toDomain(row: any): SessionUser {
    if (!row) return null;
    const session = SessionMapper.toDomain(row.session);
    const { password, createdAt, updatedAt, ...user } = row.user;
    return new SessionUser(session, user);
  }
}
