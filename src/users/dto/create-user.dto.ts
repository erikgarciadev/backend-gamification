import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
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

  @ApiPropertyOptional({
    example: 'https://docs.nestjs.com/assets/logo-small.svg',
    type: 'string',
  })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image_url?: string;

  @ApiPropertyOptional({
    example: 'M',
    type: 'enum',
    enum: ['M', 'F'],
  })
  @IsEnum(['M', 'F'])
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  gender?: string;
}
