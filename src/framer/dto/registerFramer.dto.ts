import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterFramerDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly typeFramer: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsOptional()
  readonly address: string;

  @IsNotEmpty()
  @IsOptional()
  readonly phone: string;

  @IsNotEmpty()
  @IsOptional()
  readonly country: string;

  @IsNotEmpty()
  @IsOptional()
  readonly city: string;

  @IsNotEmpty()
  @IsOptional()
  readonly establisment: string;
}