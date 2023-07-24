import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
