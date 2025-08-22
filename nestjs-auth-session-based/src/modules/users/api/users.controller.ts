import { Controller, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';
import { GetAllUsersService } from '../application/use-cases/get-all-users.service';
import { GetUserByIdService } from '../application/use-cases/get-user-by-id.service';
import { UpdateUserService } from '../application/use-cases/update-user.service';
import { DeleteUserService } from '../application/use-cases/delete-user.service';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { User } from '../domain/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getAllUsersService: GetAllUsersService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  // Define your endpoints here
  @Get()
  getAllUsers() {
    return this.getAllUsersService.execute();
  }

  @Get(':id')
  getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getUserByIdService.execute(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.updateUserService.execute(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteUserService.execute(id);
  }
}
