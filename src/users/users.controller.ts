import { Body, Controller, Post, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/user.dto';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() payload: RegisterUserDto): Promise<void> {
    return this.usersService.createUser(payload);
  }
}
