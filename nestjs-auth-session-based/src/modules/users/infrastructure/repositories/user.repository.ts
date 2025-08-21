import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '@/database/database-connection';
import { UserTable } from '@/modules/users/infrastructure/models/schema';
import { User } from '@/modules/users/domain/entities/user.entity';
import { IUserRepository } from '@/modules/users/domain/interfaces/user.interface';
import { eq } from 'drizzle-orm';
import { UserMapper } from '@/modules/users/infrastructure/mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(user: User): Promise<void> {
    const userData = UserMapper.toPersistence(user);
    await this.db.insert(UserTable).values(userData).execute();
  }

  async findById(id: string): Promise<User> {
    const [row] = await this.db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, id))
      .limit(1)
      .execute();
    return UserMapper.toDomain(row);
  }

  async findByEmail(email: string): Promise<User | null> {
    const [row] = await this.db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email))
      .limit(1)
      .execute();
    return UserMapper.toDomain(row);
  }

  async findAll(): Promise<User[]> {
    const rows = await this.db.select().from(UserTable).execute();
    return rows.map(UserMapper.toDomain);
  }

  async update(user: User): Promise<void> {
    const userData = UserMapper.toPersistence(user);
    await this.db
      .update(UserTable)
      .set(userData)
      .where(eq(UserTable.id, user.id))
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(UserTable).where(eq(UserTable.id, id)).execute();
  }
}
