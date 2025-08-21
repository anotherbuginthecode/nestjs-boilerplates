import { User } from '@/modules/users/domain/entities/user.entity';

export class UserMapper {
  static toPersistence(user: User): any {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(row: any): User {
    if (!row) return null;
    return new User(
      row.id,
      row.email,
      row.password,
      row.createdAt,
      row.updatedAt,
    );
  }

  static toDto(user: User): any {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
