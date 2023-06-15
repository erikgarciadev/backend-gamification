import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserGiftsService } from './user_gifts.service';
import { CreateUserGiftDto } from './dto/create-user_gift.dto';
import { UpdateUserGiftDto } from './dto/update-user_gift.dto';

@Controller('user-gifts')
export class UserGiftsController {
  constructor(private readonly userGiftsService: UserGiftsService) {}

  @Post()
  create(@Body() createUserGiftDto: CreateUserGiftDto) {
    return this.userGiftsService.create(createUserGiftDto);
  }

  @Get()
  findAll() {
    return this.userGiftsService.findAll();
  }

  @Get('/user/:user_id')
  generateGift(@Param('user_id') user_id: string) {
    return this.userGiftsService.generate(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGiftsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserGiftDto: UpdateUserGiftDto,
  ) {
    return this.userGiftsService.update(+id, updateUserGiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGiftsService.remove(+id);
  }
}
