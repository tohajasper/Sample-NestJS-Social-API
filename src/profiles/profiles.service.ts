import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './repository/profiles.repository';
import { ProfileDto } from './dto/profile.dto';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class ProfilesService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(payload: ProfileDto, user: UserDocument): Promise<void> {
    return this.profileRepository.createProfile(payload, user);
  }

  async getProfile(user: UserDocument): Promise<ProfileDto> {
    const profile = await this.profileRepository.findProfileByUserId(user._id)
    if (!profile) throw new NotFoundException('Profile Not Found')
    const { name, gender, birthday, height, weight } = profile
    return { name, gender, birthday, height, weight }
  }

  async updateProfile(payload: ProfileDto, user: UserDocument): Promise<ProfileDto> {
    return this.profileRepository.updateProfile(payload, user._id);
  }
}
