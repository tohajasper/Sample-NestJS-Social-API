import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() payload: LoginUserDto): Promise<string> {
    return this.authService.validateUser(payload)
  }
}
