import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(payload: LoginUserDto): Promise<string> {
    const user = await this.usersService.findUser({ usernameOrEmail: payload.usernameOrEmail});
    if (user) {
      const valid = await bcrypt.compare(payload.password, user.password)
      if (valid) return this.createAccessToken(user);
    }
    throw new UnauthorizedException("Username/Email or Password is wrong")
  }

  async createAccessToken(user: UserDocument): Promise<string> {
    const payload = {
      sub: user._id,
      username: user.username,
    }
    return this.jwtService.sign(payload)
  }
}
