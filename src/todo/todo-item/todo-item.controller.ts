import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { TodoItem } from '../entities/todo-item.entity';
import { CreateTodoItemDto } from '../dto/create-todo-item.dto';
import { UpdateTodoItemDto } from '../dto/update-todo-item.dto';

@Controller('todo-item')
export class TodoItemController {
  constructor(private todoItemService: TodoItemService) {}

  @Get()
  async findAll(): Promise<TodoItem[]> {
    return this.todoItemService.findAll();
  }

  @Get(':id')
  async findTodoById(@Param('id') id: number): Promise<TodoItem> {
    return this.todoItemService.findOne(id);
  }

  @Post()
  async create(@Body() createTodoItemDto: CreateTodoItemDto) {
    return await this.todoItemService.create(createTodoItemDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTodoItemDto: UpdateTodoItemDto,
  ) {
    return await this.todoItemService.update(id, updateTodoItemDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.todoItemService.delete(id);
  }
}
