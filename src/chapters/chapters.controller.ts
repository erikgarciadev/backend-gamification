import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @Post(':unit_id')
  createByUnit(
    @Param('unit_id') unit_id: string,
    @Body() createChapterDto: CreateChapterDto,
  ) {
    return this.chaptersService.createByUnit(unit_id, createChapterDto);
  }

  @Get()
  findAll() {
    return this.chaptersService.findAll();
  }

  @Get('/unit/:unit_id/simple')
  findAllByUnitSimple(@Param('unit_id') unit_id: string) {
    return this.chaptersService.findAllByUnitSimple(unit_id);
  }

  @Get('/unit/:unit_id')
  findAllByUnit(@Param('unit_id') unit_id: string) {
    return this.chaptersService.findAllByUnit(unit_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chaptersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(id, updateChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(id);
  }
}
