import { PartialType } from '@nestjs/swagger';
import { CreateUserCalificationDto } from './create-user_calification.dto';

export class UpdateUserCalificationDto extends PartialType(CreateUserCalificationDto) {}
