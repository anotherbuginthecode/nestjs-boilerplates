import { Injectable, Inject } from '@nestjs/common';
import { LoginService } from '../use-cases/login.service';
import { RegisterService } from '../use-cases/register.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(LoginService)
    private readonly loginService: LoginService,
    @Inject(RegisterService)
    private readonly registerService: RegisterService,
  ) {}

  async login(email: string, password: string) {
    return this.loginService.execute({ email, password });
  }

  async register(email: string, password: string) {
    return this.registerService.execute({ email, password });
  }
}
