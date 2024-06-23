import { Type } from "class-transformer";
import {  ArrayNotEmpty, IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";

class Response {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly label: string;

  @IsBoolean()
  readonly result: boolean;
}

class Question {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly label: string;

  @Type(() => Response)
  @ValidateNested()
  @ArrayNotEmpty()
  readonly responses: Response[];
}

export class UpdateTaleDto {
  @IsNotEmpty()
  @IsOptional()
  readonly title: string;

  @IsNotEmpty()
  @IsOptional()
  readonly description: string;

  @IsNotEmpty()
  @IsOptional()
  readonly videoUrl: string;

  @IsNotEmpty()
  @IsOptional()
  readonly typeTale: string;

  @IsNotEmpty()
  @IsOptional()
  readonly language: string;

  @IsNotEmpty()
  @IsOptional()
  readonly imageBackground: string;

  @Type(() => Question)
  @ValidateNested()
  readonly questions: Question[];
}