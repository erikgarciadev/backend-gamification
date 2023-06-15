import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapters, ChaptersSchema } from './schema/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chapters.name,
        schema: ChaptersSchema,
      },
    ]),
  ],
  controllers: [ChaptersController],
  providers: [ChaptersService],
  exports: [ChaptersService],
})
export class ChaptersModule {}
