import { Injectable } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { Gifts, GiftsDocument } from './schema/gift.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GiftsService {
  constructor(
    @InjectModel(Gifts.name)
    private readonly giftModel: Model<GiftsDocument>,
  ) {}

  create(createGiftDto: CreateGiftDto) {
    return this.giftModel.create(createGiftDto);
  }

  findAll() {
    return `This action returns all gifts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gift`;
  }

  update(id: number, updateGiftDto: UpdateGiftDto) {
    return `This action updates a #${id} gift`;
  }

  async remove(id: string) {
    await this.giftModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        deleted: true,
      },
      {
        new: true,
      },
    );

    return {
      message: 'Se elimino el obsequio',
    };
  }
}
