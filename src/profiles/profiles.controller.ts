import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('api')
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService){}
  @Post('createProfile')
  createProfile(@Body() payload: any): string {
    // middleware get user from token
    // return this.profileService.createProfile(payload);
    return 'hello world'
  }

  @Get('getProfile')
  getProfile(): string {
    return 'hello world';
  }

  @Put('updateProfile')
  updateProfile(): string {
    return 'hello world';
  }
}
