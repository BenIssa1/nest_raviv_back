import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class SignupDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsOptional()
  readonly role: string;
}