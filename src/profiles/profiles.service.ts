import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './repository/profiles.repository';
import { ProfileDto } from './dto/profile.dto';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class ProfilesService {
  constructor(private readonly profileRepository: ProfileRepository) {}
  async createProfile(payload: ProfileDto, user: User): Promise<void> {
    return this.profileRepository.createProfile(payload, user);
  }

  // async loginUser(payload: LoginUserDto): Promise<User | null> {
  //   const potentialUser = await this.profileRepository.findUser(payload.usernameOrEmail);
  //   if (!potentialUser) return null
  //   const valid = await bcrypt.compare(payload.password, potentialUser.password)
  //   if (valid) return potentialUser;
  //   else return null
  // }
}
