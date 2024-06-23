import { Type } from "class-transformer";
import { ArrayNotEmpty, IsBoolean, IsNotEmpty, ValidateNested } from "class-validator";

class Response {
  @IsBoolean()
  readonly result: boolean;
}

class Question {
  @Type(() => Response)
  @ValidateNested()
  @ArrayNotEmpty()
  readonly responses: Response[];
}

export class RegisterStoryHistoriesDto {
  @IsNotEmpty()
  readonly tale_id: number;

  @Type(() => Question)
  @ValidateNested()
  readonly questions: Question[];
}