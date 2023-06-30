import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  private readonly todo: Todo[] = [];

  create(todo: Todo) {
    if(todo.name) {
      this.todo.push({name: todo.name});
    }
  }

  findAll(): Todo[] {
    return this.todo;
  }
}