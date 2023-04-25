import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from '../dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async createUser(userData: RegisterUserDto): Promise<void> {
    const createUser = new this.userModel(userData);
    try {
      await createUser.save();
    } catch (error) {
      if(error.code === 11000) throw new BadRequestException(`${Object.keys(error.keyValue)} already exists`)
      else throw new InternalServerErrorException()
    }
  }

  async findUser(usernameOrEmail: string): Promise<User | null> {
    try {
      return this.userModel.findOne({ $or: ([{ email: usernameOrEmail }, { username: usernameOrEmail }]) })
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }
}
