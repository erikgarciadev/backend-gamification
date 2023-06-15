import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { UsersDocument } from 'src/users/schema/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Roles, RolesDocument } from 'src/roles/schema/role.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
    @InjectModel(Roles.name) private readonly roleModel: Model<RolesDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };
    return this.userModel.create(userObject);
  }

  async login(userObjectLogin: LoginAuthDto) {
    const { username, password } = userObjectLogin;
    const findUser = await this.userModel.findOne({ username });

    if (!findUser)
      throw new HttpException(
        {
          message: 'El usuario y/o contraseña son incorrectas',
          error: 'El usuario y/o contraseña son incorrectas',
        },
        404,
      );

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword)
      throw new HttpException(
        {
          message: 'El usuario y/o contraseña son incorrectas',
          error: 'El usuario y/o contraseña son incorrectas',
        },
        403,
      );

    let role = null;
    if (findUser.role_id) {
      role = await this.roleModel.findOne({
        _id: findUser.role_id,
      });
    }

    const payload = { id: findUser._id, firstname: findUser.firstname || '' };
    const token = await this.jwtService.sign(payload);

    const user = {
      _id: findUser._id,
      image_url: findUser?.image_url,
      username: findUser.username,
      firstname: findUser.firstname || '',
      points: findUser?.points ?? 0,
      coins: findUser?.coins ?? 0,
      role,
    };

    const data = {
      user,
      token,
    };
    return data;
  }
}
