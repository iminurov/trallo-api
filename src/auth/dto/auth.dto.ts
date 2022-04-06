import { IsEmail, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'example@mail.com' })
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @IsEmail({ require_tld: false }, { always: true })
  email: string;

  @ApiProperty({ example: 'cdfvjnfvj' })
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  password: string;

  @ApiProperty({ example: 'Ivan' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Ivanov' })
  @IsString({ always: true })
  lastName: string;
}
