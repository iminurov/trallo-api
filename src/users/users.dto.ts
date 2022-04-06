import { IsEmail, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @IsEmail({ require_tld: false }, { always: true })
  email: string;

  @IsString({ always: true })
  password: string;

  @IsString()
  firstName: string;

  @IsString({ always: true })
  lastName: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
