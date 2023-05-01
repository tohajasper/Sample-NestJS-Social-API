import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import mongoose, { Model } from 'mongoose';
import { FindUserDto, RegisterUserDto } from '../dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async createUser(userData: RegisterUserDto): Promise<void> {
    const createUser = new this.userModel(userData);
    try {
      await createUser.save();
    } catch (error) {
      if (error.code === 11000) throw new BadRequestException(`${Object.keys(error.keyValue)} already exists`)
      else throw new InternalServerErrorException()
    }
  }

  async findUser(payload: FindUserDto): Promise<UserDocument | null> {
    const { usernameOrEmail, id } = payload
    if (!usernameOrEmail && !id) return null

    const whereQuery = id ?
      {
        _id: new mongoose.Types.ObjectId(id)
      } : {
        $or: ([
          { email: usernameOrEmail },
          { username: usernameOrEmail },
        ])
      }
    try {
      return this.userModel.findOne({
        ...whereQuery,
      })
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }
}
