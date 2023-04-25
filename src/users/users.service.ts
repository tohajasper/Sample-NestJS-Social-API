import { HttpException, Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import { UsersRepository } from './repository/users.repository';
import * as bcrypt from 'bcrypt';
const salt = parseInt(process.env.SALT || "0");

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(payload: RegisterUserDto): Promise<void> {
    let { username, email, password } = payload;
    const newUser = {
      username,
      email,
      password: await bcrypt.hash(password, salt),
    };
    return this.usersRepository.createUser(newUser);
  }

  async findUser(payload: LoginUserDto): Promise<UserDocument | null> {
    return this.usersRepository.findUser(payload.usernameOrEmail);
    
  }
}
