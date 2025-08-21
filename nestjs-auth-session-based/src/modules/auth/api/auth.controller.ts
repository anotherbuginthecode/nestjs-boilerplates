import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../application/services/auth.service';
import { LoginDto } from '../application/dto/login.dto';
import { RegisterDto } from '../application/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(
        registerDto.email,
        registerDto.password,
      );
    } catch (error) {
      return { statusCode: 400, message: 'Registration failed.' };
    }
  }
}
