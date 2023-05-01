import { Body, Controller, Get, Post, Put, UseGuards, Request } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from 'src/users/schema/user.schema';
import { GetUser } from 'src/users/user.decorator';
import { ProfileDto } from './dto/profile.dto';

@Controller('api')
@UseGuards(AuthGuard('jwt'))
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService){}
  @Post('createProfile')
  createProfile(@GetUser() user: UserDocument, @Body() payload: ProfileDto): Promise<void> {
    return this.profileService.createProfile(payload, user)
  }

  @Get('getProfile')
  getProfile(@GetUser() user: UserDocument): Promise<ProfileDto> {
    return this.profileService.getProfile(user);
  }

  @Put('updateProfile')
  updateProfile(@GetUser() user: UserDocument, @Body() payload: ProfileDto): Promise<ProfileDto> {
    return this.profileService.updateProfile(payload, user);
  }
}
