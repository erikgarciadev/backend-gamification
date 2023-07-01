import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateBadgeDto {
  @IsString()
  image_url: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  unit_id?: string;

  @IsString()
  @IsOptional()
  chapter_id?: string;

  @IsNumber()
  points?: number;
}
