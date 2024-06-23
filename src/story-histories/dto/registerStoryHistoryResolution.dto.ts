import { IsNotEmpty } from "class-validator";

export class RegisterStoryHistoryResolutionDto {
  @IsNotEmpty()
  readonly tale_id: number;

  @IsNotEmpty()
  readonly resolution: string;
}