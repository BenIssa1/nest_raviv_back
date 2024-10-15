import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class SignupDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  readonly pseudo: string;

  @IsOptional()
  readonly phone: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsOptional()
  readonly role: string;
}