import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsEnum,
  IsUrl,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class Resource {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateChapterDto {
  image_url?: string | null;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  information: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Resource)
  resources: Resource[];

  @IsArray()
  @Type(() => Object)
  questions: Record<string, any>[];
}
