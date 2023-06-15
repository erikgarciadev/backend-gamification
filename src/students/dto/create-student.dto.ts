import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    example: 'erikg',
    type: 'string',
    minLength: 6,
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firstname?: string;

  @ApiProperty({
    example: 'dadarebser',
    type: 'string',
    minLength: 6,
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  role_id?: string;
}
