import { Body, Controller, ForbiddenException, Get, HttpException, Post, Put, UnauthorizedException, } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto, LoginUserDto } from './dto/user.dto';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() payload: RegisterUserDto): Promise<void> {
    return this.usersService.createUser(payload);
  }
}
