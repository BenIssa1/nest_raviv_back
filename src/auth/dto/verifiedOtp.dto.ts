import {  IsNotEmpty } from "class-validator";

export class VerifiedOtpDto {
  @IsNotEmpty()
  readonly otp: any;
}