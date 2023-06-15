import { PartialType } from '@nestjs/swagger';
import { CreateUserGiftDto } from './create-user_gift.dto';

export class UpdateUserGiftDto extends PartialType(CreateUserGiftDto) {}
