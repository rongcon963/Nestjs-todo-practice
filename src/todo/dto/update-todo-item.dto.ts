import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTodoItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
