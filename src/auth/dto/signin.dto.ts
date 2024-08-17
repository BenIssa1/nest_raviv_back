import { IsEmail, IsNotEmpty } from "class-validator";

export class SigninDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}