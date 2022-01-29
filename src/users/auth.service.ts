import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';

//? Convert the scrypt from use callback to use promise.
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  /**
   * Signs up users
   * @param email - user email
   * @param password - user password
   * @returns user
   */
  async signUp(email: string, password: string): Promise<User> {
    //? See if email in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('Email is already in use 👥');
    }

    //? Hash user password
    //*Generate a salt
    const salt = randomBytes(8).toString('hex');

    //* Hash the salt with the password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //* Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    //? Create a new user and save it
    const user = await this.userService.create(email, result);

    //? Return the user
    return user;
  }

  /**
   * Signs in users
   * @param email - user email
   * @param password - user password
   * @returns user
   */
  async signIn(email: string, password: string) {
    //? Find user by email
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not found ❌🙋🏻‍♂️');
    }

    //? Compare user's password
    //* Get the salt and hash of the user password
    const [salt, storedHash] = user.password.split('.');

    //* Hash the given password with the salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //* Do comparison
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password ❌🙋🏻‍♂️');
    }

    //? Return the user
    return user;
  }
}
