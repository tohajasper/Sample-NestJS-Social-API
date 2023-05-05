import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from '../schema/profile.schema';
import { Model, Query, Types, UpdateWriteOpResult } from 'mongoose';
import { ProfileDto } from '../dto/profile.dto';
import { UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class ProfileRepository {
  constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>) { }

  async createProfile(profileData: ProfileDto, user: UserDocument): Promise<void> {
    const createProfle = new this.profileModel(profileData);
    createProfle.user = user;
    try {
      await createProfle.save();
    } catch (error) {
      if(error.code === 11000) throw new BadRequestException(`This user already had a profile, use updateProfile endpoint!`)
      // if(error.message.includes('validation failed')) throw new BadRequestException(error.message)
      throw new InternalServerErrorException()
    }
  }

  async findProfileByUserId(userId: Types.ObjectId): Promise<Profile | null> {
    try {
      return this.profileModel.findOne({ user : userId })
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }

  async updateProfile(profileData: ProfileDto, userId: Types.ObjectId): Promise<Profile | null> {
    try {
      // mongoose didnt have the typings so we cast it
      return this.profileModel.findOneAndUpdate({ user: userId }, { ...profileData }, { new: true }) as unknown as Profile | null
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }

}
