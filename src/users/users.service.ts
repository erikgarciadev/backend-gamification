import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users, UsersDocument } from './schema/user.schema';

const fieldsUser = {
  username: 1,
  firstname: 1,
  image_url: 1,
  deleted: 1,
  created_at: 1,
  updated_at: 1,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModule: Model<UsersDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userCreated = await this.usersModule.create(createUserDto);
    return userCreated;
  }

  async findAll() {
    const users = await this.usersModule.find(
      {
        deleted: false,
      },
      fieldsUser,
    );
    return users;
  }

  async findOne(id: string) {
    const response = await this.usersModule.findById(id, fieldsUser);
    return response;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const response = await this.usersModule.findOneAndUpdate(
      {
        _id: id,
      },
      updateUserDto,
      {
        new: true,
        fields: fieldsUser,
      },
    );

    return response;
  }

  async remove(id: string) {
    const response = await this.usersModule.findOneAndUpdate(
      {
        _id: id,
      },
      {
        deleted: true,
      },
      {
        new: true,
        fields: fieldsUser,
      },
    );

    return response;
  }
}
