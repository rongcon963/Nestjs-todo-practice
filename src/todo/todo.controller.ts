import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
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