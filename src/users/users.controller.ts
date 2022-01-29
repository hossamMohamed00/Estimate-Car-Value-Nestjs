import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Response
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin-user.dto';

@Controller('auth')
@Serialize(UserDto)
@ApiTags('Users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  /**
   * Create new user
   */
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  /**
   * Get user information by id
   * @param id user id
   * @returns User
   */
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('User not found ❌🙋🏻‍♂️');
    return user;
  }

  /**
   * Gets all users
   * @Query email - user email
   * @returns  Array of users
   */
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  /**
   * Update user information
   * @param id - user id
   * @Body UpdateUserDto
   * @returns updated user information
   */
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  /**
   * Delete user by id
   * @param id - user id
   * @returns deleted user
   */
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
