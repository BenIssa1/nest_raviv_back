import { Type } from "class-transformer";
import {  ArrayNotEmpty, IsBoolean, IsNotEmpty, ValidateNested } from "class-validator";

class Response {
  @IsNotEmpty()
  readonly label: string;

  @IsBoolean()
  readonly result: boolean;
}

class Question {
  @IsNotEmpty()
  readonly label: string;

  @Type(() => Response)
  @ValidateNested()
  @ArrayNotEmpty()
  readonly responses: Response[];
}

export class RegisterTaleDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly videoUrl: string;

  @IsNotEmpty()
  readonly typeTale: string;

  @IsNotEmpty()
  readonly language: string;

  @IsNotEmpty()
  readonly imageBackground: string;

  @Type(() => Question)
  @ValidateNested()
  readonly questions: Question[];
}