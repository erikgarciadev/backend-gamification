import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles, RolesDocument } from './schema/role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles.name) private rolesModule: Model<RolesDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const userCreated = await this.rolesModule.create(createRoleDto);
    return userCreated;
  }

  async findAll() {
    const roles = await this.rolesModule.find({
      deleted: false,
    });
    return roles;
  }

  findOne(id: string) {
    return `This action returns a #${id} role`;
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }
}
