import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

export class LoginUserDto {
  usernameOrEmail: string;

  @MinLength(8)
  password: string;
}

export interface FindUserDto {
  usernameOrEmail?: string;
  id?: string;
}
