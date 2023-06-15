import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @ApiPropertyOptional({
    example: 'Erik',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiPropertyOptional({
    example: 'M',
    type: 'enum',
    enum: ['M', 'F'],
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsEnum(['M', 'F'])
  gender?: string;

  @ApiPropertyOptional({
    example: 'https://docs.nestjs.com/assets/logo-small.svg',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsUrl()
  image_url?: string;
}
