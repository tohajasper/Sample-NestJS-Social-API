import { IsOptional, IsNumber, IsIn, IsDateString } from "class-validator";

export class ProfileDto {
  @IsOptional()
  name?: string;

  @IsIn(['Male', 'Female'])
  @IsOptional()
  gender?: 'Male' | 'Female';

  @IsDateString()
  @IsOptional()
  birthday?: Date;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;
}
