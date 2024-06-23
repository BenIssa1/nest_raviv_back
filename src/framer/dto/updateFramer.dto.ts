import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateFramerDto {
  @IsNotEmpty()
  @IsOptional()
  readonly firstName: string;

  @IsNotEmpty()
  @IsOptional()
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