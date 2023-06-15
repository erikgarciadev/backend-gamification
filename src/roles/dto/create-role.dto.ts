import {
  IsString,
  IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'erikg',
    type: 'string',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'erikg',
    type: 'string',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}
