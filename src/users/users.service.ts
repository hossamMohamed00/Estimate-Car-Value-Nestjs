import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  /**
   * Creates new users
   * @param email
   * @param password
   * @returns Promise<User>
   */
  create(email: string, password: string): Promise<User> {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  /**
   * Finds one user by id
   * @param id
   * @returns  Promise<User>
   */
  findOne(id: number): Promise<User> {
    if (!id) return null;
    return this.repo.findOne(id);
  }

  /**
   * Finds all users by email
   * @param email
   * @returns Promise<User[]>
   */
  find(email?: string): Promise<User[]> {
    if (!email) return this.repo.find();

    return this.repo.find({ email });
  }

  /**
   * Updates users data
   * @param id
   * @param attrs - Object with updated attributes
   * @returns - Promise<User>
   */
  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found ❌🙋🏻‍♂️');
    }

    // Copy the updated attributes to the user object
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  /**
   * Removes user by id
   * @param id
   * @returns Promise<User>
   */
  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found ❌🙋🏻‍♂️');
    }

    // Remove the user from the repository
    return this.repo.remove(user);
  }
}
