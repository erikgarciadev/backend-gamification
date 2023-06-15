import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserCalificationsService } from './user_califications.service';
import {
  CreateUserCalificationDto,
  EvaluationDto,
} from './dto/create-user_calification.dto';
import { UpdateUserCalificationDto } from './dto/update-user_calification.dto';

@Controller('user_califications')
export class UserCalificationsController {
  constructor(
    private readonly userCalificationsService: UserCalificationsService,
  ) {}

  @Post('/evaluation')
  evaluation(@Body() evalation: EvaluationDto) {
    return this.userCalificationsService.evaluation(evalation);
  }

  @Post()
  create(@Body() createUserCalificationDto: CreateUserCalificationDto) {
    return this.userCalificationsService.create(createUserCalificationDto);
  }

  @Get()
  findAll() {
    return this.userCalificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCalificationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserCalificationDto: UpdateUserCalificationDto,
  ) {
    return this.userCalificationsService.update(+id, updateUserCalificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCalificationsService.remove(+id);
  }
}
