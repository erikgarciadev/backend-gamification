import { Injectable, HttpException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles, RolesDocument } from 'src/roles/schema/role.schema';
import { Users, UsersDocument } from 'src/users/schema/user.schema';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ROLES } from 'src/utils/constants';

const fieldsUser = {
  username: 1,
  firstname: 1,
  created_at: 1,
  updated_at: 1,
  deleted: 1,
};

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    @InjectModel(Roles.name) private readonly roleModel: Model<RolesDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { password, username } = createStudentDto;
    const findUser = await this.userModel.findOne({ username });

    const roleStudent = await this.roleModel.findOne({
      value: ROLES.STUDENT,
    });

    if (findUser)
      throw new HttpException(
        {
          message: 'El username ya se encuentra en uso',
          errors: {
            username: 'El username ya se encuentra en uso',
          },
        },
        404,
      );
    const plainToHash = await hash(password, 10);
    createStudentDto = {
      ...createStudentDto,
      password: plainToHash,
      role_id: roleStudent._id,
    };
    return this.userModel.create(createStudentDto);
  }

  async findAll(params: any) {
    const roleStudent = await this.roleModel.findOne({
      value: ROLES.STUDENT,
    });

    const { page, search } = params;

    const skip = (page ?? 0) * 10;

    const users = await this.userModel
      .find(
        {
          deleted: false,
          role_id: roleStudent._id,
          $or: [
            {
              username: { $regex: search ?? '', $options: 'i' },
            },
            {
              firstname: { $regex: search ?? '', $options: 'i' },
            },
          ],
        },
        fieldsUser,
      )
      .skip(skip)
      .limit(100);

    return users;
  }

  findOne(id: string) {
    return `This action returns a #${id} student`;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const { username, password } = updateStudentDto;

    const findUser = await this.userModel.findOne({ username });

    if (findUser && findUser.username !== username)
      throw new HttpException(
        {
          message: 'El usuario ya se encuentra en uso',
          errors: {
            username: 'El usuario ya se encuentra en uso',
          },
        },
        404,
      );

    if (password) {
      const plainToHash = await hash(password, 10);
      updateStudentDto = { ...updateStudentDto, password: plainToHash };
    }

    const res = await this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      updateStudentDto,
      {
        new: true,
      },
    );

    return {
      data: {
        user: res,
      },
      message: 'Se actualizo el estudiante',
    };
  }

  async remove(id: string) {
    await this.userModel.findOneAndUpdate(
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
      message: 'Se elimino el estudiante',
    };
  }
}
