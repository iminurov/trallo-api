import { PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength } from 'class-validator';

export class CreateCommentsDto {
  @IsString({ always: true })
  cardId: string;

  @IsString({ always: true })
  @MaxLength(100, { always: true })
  name: string;

  @IsString({ always: true })
  @MaxLength(1000, { always: true })
  body: string;
}

export class UpdateCommentsDto extends PartialType(CreateCommentsDto) {}
