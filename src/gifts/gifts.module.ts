import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gifts, GiftsSchema } from './schema/gift.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Gifts.name,
        schema: GiftsSchema,
      },
    ]),
  ],
  controllers: [GiftsController],
  providers: [GiftsService],
})
export class GiftsModule {}
