import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}
