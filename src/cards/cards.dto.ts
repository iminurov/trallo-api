import { PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength } from 'class-validator';

export class CreateCardsDto {
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  name: string;

  @IsString({ always: true })
  columnId: string;
}

export class UpdateCardsDto extends PartialType(CreateCardsDto) {}
