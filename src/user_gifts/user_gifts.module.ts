import { Module } from '@nestjs/common';
import { UserGiftsService } from './user_gifts.service';
import { UserGiftsController } from './user_gifts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGifts, UserGiftsSchema } from './schema/user_gift.schema';
import { Gifts, GiftsSchema } from 'src/gifts/schema/gift.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserGifts.name,
        schema: UserGiftsSchema,
      },
      {
        name: Gifts.name,
        schema: GiftsSchema,
      },
    ]),
  ],
  controllers: [UserGiftsController],
  providers: [UserGiftsService],
})
export class UserGiftsModule {}
