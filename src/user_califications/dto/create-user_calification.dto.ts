import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsEnum,
  IsUrl,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateUserCalificationDto {
  @IsString()
  @IsNotEmpty()
  unit_id: string;

  @IsString()
  @IsNotEmpty()
  chapter_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  points: number;
}

export class EvaluationDto {
  @IsString()
  @IsNotEmpty()
  chapter_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsArray()
  @Type(() => Object)
  questions: Record<string, any>[];
}
