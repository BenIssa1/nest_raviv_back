import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsOptional()
  readonly firstName: string;

  @IsNotEmpty()
  @IsOptional()
  readonly lastName: string;

  @IsNotEmpty()
  @IsOptional()
  readonly classroom: string;

  @IsNotEmpty()
  @IsOptional()
  readonly establisment: string;
}