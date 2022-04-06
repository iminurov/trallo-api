import { PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength } from 'class-validator';

export class CreateColumnsDto {
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  name: string;
}

export class UpdateColumnsDto extends PartialType(CreateColumnsDto) {}
