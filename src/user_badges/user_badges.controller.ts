import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserBadgesService } from './user_badges.service';
import { CreateUserBadgeDto } from './dto/create-user_badge.dto';
import { UpdateUserBadgeDto } from './dto/update-user_badge.dto';

@Controller('user_badges')
export class UserBadgesController {
  constructor(private readonly userBadgesService: UserBadgesService) {}

  @Post()
  create(@Body() createUserBadgeDto: CreateUserBadgeDto) {
    return this.userBadgesService.create(createUserBadgeDto);
  }

  @Get()
  findAll() {
    return this.userBadgesService.findAll();
  }

  @Get('/user/:user_id')
  findAllByUser(@Param('user_id') user_id: string) {
    return this.userBadgesService.findAllByUser(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBadgesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserBadgeDto: UpdateUserBadgeDto,
  ) {
    return this.userBadgesService.update(+id, updateUserBadgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBadgesService.remove(+id);
  }
}
