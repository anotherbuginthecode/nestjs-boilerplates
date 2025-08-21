export class Session {
  constructor(
    public readonly id: string,
    private readonly userId: string,
    public readonly expiresAt: Date,
  ) {}

  getUserId(): string {
    return this.userId;
  }
}
