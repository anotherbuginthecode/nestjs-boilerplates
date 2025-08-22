import { GetAllUsersService } from './use-cases/get-all-users.service';
import { GetUserByEmailService } from './use-cases/get-user-by-email.service';
import { GetUserByIdService } from './use-cases/get-user-by-id.service';
import { UpdateUserService } from './use-cases/update-user.service';
import { DeleteUserService } from './use-cases/delete-user.service';
import { CreateUserService } from './use-cases/create-user.service';

export const USERS_USE_CASES = [
  GetAllUsersService,
  GetUserByEmailService,
  GetUserByIdService,
  UpdateUserService,
  DeleteUserService,
  CreateUserService,
];

export default {
  GetAllUsersService,
  GetUserByEmailService,
  GetUserByIdService,
  UpdateUserService,
  DeleteUserService,
  CreateUserService,
};
