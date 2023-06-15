import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    minimum: 0,
    maximum: 10000,
    title: 'Page',
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: 'int32',
    default: 0,
  })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  take?: number;

  @ApiPropertyOptional({
    minimum: 0,
    maximum: 10000,
    title: 'Page',
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: 'int32',
    default: 0,
  })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  skip?: number;

  @ApiPropertyOptional({
    title: 'search',

    default: '',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
