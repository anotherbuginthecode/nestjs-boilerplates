import { DATABASE_CONNECTION } from '@/database/database-connection';
import { UserTable } from '@/modules/users/infrastructure/models/schema';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Session } from '@/modules/auth/domain/entities/session.entity';
import { ISessionRepository } from '@/modules/auth/domain/interfaces/session.interface';
import { SessionUser } from '../../domain/entities/session-user.entity';
import { sessionTable } from '../models/schema';
import { SessionMapper, SessionUserMapper } from '../mappers/session.mapper';

@Injectable()
export class SessionRepository implements ISessionRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(sessionData: Session): Promise<void> {
    const session = SessionMapper.toPersistence(sessionData);
    await this.db.insert(sessionTable).values(session).execute();
  }

  async findById(id: string): Promise<SessionUser> {
    const [res] = await this.db
      .select({ user: UserTable, session: sessionTable })
      .from(sessionTable)
      .innerJoin(UserTable, eq(sessionTable.userId, UserTable.id))
      .where(eq(sessionTable.id, id));
    return SessionUserMapper.toDomain(res);
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(sessionTable).where(eq(sessionTable.id, id)).execute();
  }

  async deleteAllSessionsByUserId(userId: string): Promise<void> {
    await this.db
      .delete(sessionTable)
      .where(eq(sessionTable.userId, userId))
      .execute();
  }

  async update(sessionId: string, sessionData: Session): Promise<void> {
    const session = SessionMapper.toPersistence(sessionData);
    await this.db
      .update(sessionTable)
      .set(session)
      .where(eq(sessionTable.id, sessionId))
      .execute();
  }
}
