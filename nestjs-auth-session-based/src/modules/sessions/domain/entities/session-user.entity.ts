import { User } from '@/modules/users/domain/entities/user.entity';
import { Session } from './session.entity';

export class SessionUser {
  constructor(
    public readonly session: Session,
    public readonly user: Omit<User, 'password' | 'createdAt' | 'updatedAt'>,
  ) {}
}
