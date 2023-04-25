import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, JwtModule.register(jwtConfig)],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
