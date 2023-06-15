import { IsString } from 'class-validator';

export class CreateUserBadgeDto {
  @IsString()
  user_id: string;

  @IsString()
  badge_id: string;
}
