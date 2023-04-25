import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() payload: LoginUserDto): Promise<string> {
    return  this.authService.validateUser(payload)
  }
}
