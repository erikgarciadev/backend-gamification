import { Injectable } from '@nestjs/common';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Badges, BadgesDocument } from './schema/badge.schema';

@Injectable()
export class BadgesService {
  constructor(
    @InjectModel(Badges.name)
    private readonly badgeModel: Model<BadgesDocument>,
  ) {}

  create(createBadgeDto: CreateBadgeDto) {
    return this.badgeModel.create(createBadgeDto);
  }

  async findAll() {
    const badges = await this.badgeModel.find({
      deleted: false,
    });

    return badges;
  }

  findOne(id: number) {
    return `This action returns a #${id} badge`;
  }

  async update(id: string, updateBadgeDto: UpdateBadgeDto) {
    await this.badgeModel.findByIdAndUpdate(
      {
        _id: id,
      },
      updateBadgeDto,
      {
        new: true,
      },
    );

    return {
      message: 'Se actualizo el insignia',
    };
  }

  async remove(id: string) {
    await this.badgeModel.findOneAndUpdate(
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
      message: 'Se elimino el insignia',
    };
  }
}
