import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';
const JWT_SECRET = process.env.JWT_SECRET

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService:UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // turn this to false in prod
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: any) : Promise<UserDocument>{
    const { sub } = payload
    const user = await this.usersService.findUser({id: sub})
    if (!user) throw new UnauthorizedException('User not found')
    return user;
  }
}