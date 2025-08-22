import { LoginService } from './login.service';
import { RegisterService } from './register.service';

export const AUTH_USE_CASES = [LoginService, RegisterService];

export default {
  LoginService,
  RegisterService,
};
