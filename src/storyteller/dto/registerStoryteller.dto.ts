import { IsNotEmpty, IsOptional } from "class-validator";

export class RegisterStorytellerDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly phone: string;
  
  @IsNotEmpty()
  @IsOptional()
  readonly experience: string;

  @IsNotEmpty()
  @IsOptional()
  readonly cvUrl: string;

  @IsNotEmpty()
  @IsOptional()
  readonly address: string;

  @IsNotEmpty()
  @IsOptional()
  readonly fieldOfActivity: string;
}