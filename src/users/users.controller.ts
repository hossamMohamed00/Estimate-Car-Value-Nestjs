import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Create new user
   */
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
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
