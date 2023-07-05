import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.create(createTodoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
  ) {
    return await this.todoService.delete(id);
  }

  @Get(':id')
  async findTodoById(id: number): Promise<Todo>{
    return this.todoService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll()
  }
}