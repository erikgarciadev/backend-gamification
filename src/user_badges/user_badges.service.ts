import { Injectable } from '@nestjs/common';
import { CreateUserBadgeDto } from './dto/create-user_badge.dto';
import { UpdateUserBadgeDto } from './dto/update-user_badge.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserBadges, UserBadgesDocument } from './schema/user_badge.schema';
import { Badges, BadgesDocument } from 'src/badges/schema/badge.schema';

@Injectable()
export class UserBadgesService {
  constructor(
    @InjectModel(UserBadges.name)
    private readonly userBadgeModel: Model<UserBadgesDocument>,
    @InjectModel(Badges.name)
    private readonly badgeModel: Model<BadgesDocument>,
  ) {}

  async create(createUserBadgeDto: CreateUserBadgeDto) {
    await this.userBadgeModel.create({
      ...createUserBadgeDto,
    });

    return {
      message: 'Se asigno una insignia al usuario',
    };
  }

  findAll() {
    return `This action returns all userBadges`;
  }

  async findAllByUser(user_id: string) {
    const userBadges = await this.userBadgeModel.find({
      deleted: false,
      user_id,
    });

    const data = [];
    for (const userBadge of userBadges) {
      const badge = await this.badgeModel.findOne({
        id: userBadge._id,
      });

      data.push({
        badge,
        ...userBadge,
      });
    }

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBadge`;
  }

  update(id: number, updateUserBadgeDto: UpdateUserBadgeDto) {
    return `This action updates a #${id} userBadge`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBadge`;
  }
}
