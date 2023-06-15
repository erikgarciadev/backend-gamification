import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserGiftDto } from './dto/create-user_gift.dto';
import { UpdateUserGiftDto } from './dto/update-user_gift.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gifts, GiftsDocument } from 'src/gifts/schema/gift.schema';
import { UserGifts, UserGiftsDocument } from './schema/user_gift.schema';

@Injectable()
export class UserGiftsService {
  constructor(
    @InjectModel(Gifts.name) private readonly giftModel: Model<GiftsDocument>,
    @InjectModel(UserGifts.name)
    private readonly userGiftModel: Model<UserGiftsDocument>,
  ) {}

  create(createUserGiftDto: CreateUserGiftDto) {
    return 'This action adds a new userGift';
  }

  async generate(user_id: string) {
    //all gifts

    const gifts = await this.giftModel.find({
      deleted: false,
    });

    //all gifts of users

    const userGifts = await this.userGiftModel.find({
      deleted: false,
      user_id,
    });

    if (gifts.length === userGifts.length) {
      throw new HttpException(
        {
          message: 'Ya tiene todos los regalos disponibles',
        },
        404,
      );
    }

    const filterGifts = gifts.filter((gift) => !userGifts.includes(gift._id));

    const findGift = filterGifts[0];

    await this.userGiftModel.create({
      user_id,
      gift_id: findGift._id,
    });

    return {
      message: 'Se agrego el regalo al estudiante',
    };
  }

  findAll() {
    return `This action returns all userGifts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userGift`;
  }

  update(id: number, updateUserGiftDto: UpdateUserGiftDto) {
    return `This action updates a #${id} userGift`;
  }

  remove(id: number) {
    return `This action removes a #${id} userGift`;
  }
}
