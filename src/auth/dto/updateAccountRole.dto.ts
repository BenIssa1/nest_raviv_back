import {  IsNotEmpty } from "class-validator";

export class UpdateAccountRoleDto {
  @IsNotEmpty()
  readonly role: string;
}