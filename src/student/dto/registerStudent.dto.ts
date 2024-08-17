import { IsNotEmpty } from "class-validator";

export class RegisterStudentDto {
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly pseudo: string;

  @IsNotEmpty()
  readonly classroom: string;

  @IsNotEmpty()
  readonly establisment: string;
}