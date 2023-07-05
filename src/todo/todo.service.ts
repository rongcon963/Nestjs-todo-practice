import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  // private readonly todo: Todo[] = [];

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(todo: CreateTodoDto) {
    if(!todo.name) {
      throw new HttpException('Field name is not empty!', HttpStatus.BAD_REQUEST);
    }

    const result = await this.todoRepository.create(todo);

    return await this.todoRepository.save(result);
  }

  async update(id: number, todo: UpdateTodoDto) {
    const todos = await this.todoRepository.findOneBy({ id });
    if (!todos) {
      throw new HttpException(`Todo doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    return await this.todoRepository.update({id}, todo);
  }

  async delete(id: number) {
    const todos = await this.todoRepository.findOneBy({ id });
    if (!todos) {
      throw new HttpException(`Todo doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    return await this.todoRepository.delete({ id }); 
  }

  async findOne(id: number): Promise<Todo | null> {
    const todo =  await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new HttpException(`Todo doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }
}