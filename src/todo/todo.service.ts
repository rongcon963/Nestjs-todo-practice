import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  // private readonly todo: Todo[] = [];

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(todo: CreateTodoDto) {
    if(!todo.name) {
      throw new HttpException('Field name is not empty!', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const result = this.todoRepository.create(todo);

    return this.todoRepository.save(result);
  }

  findOne(id: number): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id });
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
}