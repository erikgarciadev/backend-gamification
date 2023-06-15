import { IsNumber, IsString } from 'class-validator';

export class CreateBadgeDto {
  @IsString()
  image_url: string;

  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsString()
  unit_id?: string;

  @IsString()
  chapter_id?: string;

  @IsNumber()
  points?: number;
}
