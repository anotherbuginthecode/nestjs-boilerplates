import { LoginService } from './login.use-case';
import { RegisterService } from './register.use-case';

export const AUTH_USE_CASES = [LoginService, RegisterService];

export default {
  LoginService,
  RegisterService,
};
