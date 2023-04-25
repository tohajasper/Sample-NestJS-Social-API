import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from '../schema/profile.schema';
import { Model } from 'mongoose';
import { ProfileDto } from '../dto/profile.dto';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class ProfileRepository {
  constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>) { }

  async createProfile(profileData: ProfileDto, user: User): Promise<void> {
    const createProfle = new this.profileModel(profileData);
    createProfle.user = user;
    try {
      await createProfle.save();
    } catch (error) {
      // if(error.code === 11000) throw new BadRequestException(`${Object.keys(error.keyValue)} already exists`)
      throw new InternalServerErrorException()
    }
  }

  async findUser(usernameOrEmail: string): Promise<Profile | null> {
    try {
      return this.profileModel.findOne({ $or: ([{ email: usernameOrEmail }, { username: usernameOrEmail }]) })
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }
}
