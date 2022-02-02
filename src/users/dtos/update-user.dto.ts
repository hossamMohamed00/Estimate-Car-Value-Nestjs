import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

//* Extend all properties from Create User Dto bust with all properties as optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}
