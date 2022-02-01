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
  Session,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  /**
   * Find who currently logged in.
   * @returns  user object
   */
  @ApiTags('Auth')
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  /**
   * Sign user out.
   */
  @ApiTags('Auth')
  @Post('/signout')
  @HttpCode(200)
  signout(@Session() session: any) {
    session.userId = null;
  }

  /**
   * Create new user (signup/register)
   * @Body {CreateUserDto}
   * @return user object
   */
  @ApiTags('Auth')
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);

    //* Add userId to session
    session.userId = user.id;

    return user;
  }

  /**
   * Sign in a user
   * @Body {SignInDto}
   * @return user object
   */
  @ApiTags('Auth')
  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);

    //* Add userId to session
    session.userId = user.id;

    return user;
  }

  /**
   * Get user information by id
   * @param id user id
   * @returns User
   */
  @ApiTags('Users')
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
  @ApiTags('Users')
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
  @ApiTags('Users')
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  /**
   * Delete user by id
   * @param id - user id
   * @returns deleted user
   */
  @ApiTags('Users')
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
