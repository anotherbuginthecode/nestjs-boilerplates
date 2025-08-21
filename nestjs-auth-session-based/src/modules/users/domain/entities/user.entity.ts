import * as argon2 from 'argon2';

export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date | null = null,
  ) {}

  async setPassword(): Promise<void> {
    this.password = await this.hashPassword(this.password);
  }

  private async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
