import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
