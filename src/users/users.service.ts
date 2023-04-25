import { HttpException, Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { User } from './schema/user.schema';
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

  async loginUser(payload: LoginUserDto): Promise<User | null> {
    const potentialUser = await this.usersRepository.findUser(payload.usernameOrEmail);
    if (!potentialUser) return null
    const valid = await bcrypt.compare(payload.password, potentialUser.password)
    if (valid) return potentialUser;
    else return null
  }
}
