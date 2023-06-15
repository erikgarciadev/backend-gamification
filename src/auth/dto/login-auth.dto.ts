import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({
    example: 'erikg',
    type: 'string',
    minLength: 6,
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'contrasegura',
    type: 'string',
    minLength: 6,
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
}
