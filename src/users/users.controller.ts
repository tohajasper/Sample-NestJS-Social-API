import { Body, Controller, ForbiddenException, Get, HttpException, Post, Put, UnauthorizedException, } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto, LoginUserDto } from './dto/user.dto';
import { User } from './schema/user.schema';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() payload: RegisterUserDto): Promise<void> {
    return this.usersService.createUser(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginUserDto): Promise<string | HttpException> {
    const user = await this.usersService.loginUser(payload)
    if (!user) throw new UnauthorizedException("Username/Email or Password is wrong")
    return `Hello ${user.username || user.email}`;
  }
}
