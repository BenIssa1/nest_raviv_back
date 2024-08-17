import { IsNotEmpty } from "class-validator";

export class RegisterCommentDto {
  @IsNotEmpty()
  readonly message: string;

  @IsNotEmpty()
  readonly taleId: number;
}