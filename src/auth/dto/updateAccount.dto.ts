import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateAccountDto {
  @IsOptional()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}