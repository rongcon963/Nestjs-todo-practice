import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Between, Repository } from 'typeorm';
import { UpdateTodoDto } from './dto/update-todo.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class TodoService {
  // private readonly todo: Todo[] = [];

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(todo: CreateTodoDto) {
    if (!todo.name) {
      throw new HttpException(
        'Field name is not empty!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = this.todoRepository.create(todo);
    result.created_at = new Date();

    return await this.todoRepository.save(result);
  }

  async update(id: number, todo: UpdateTodoDto) {
    const todoUpdate = await this.todoRepository.findOneBy({ id });
    if (!todoUpdate) {
      throw new HttpException(`Todo doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    return await this.todoRepository.update({ id }, todo);
  }

  async delete(id: number) {
    const todos = await this.todoRepository.findOneBy({ id });
    if (!todos) {
      throw new HttpException(`Todo doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    return await this.todoRepository.delete({ id });
  }

  async findOne(id: number): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['todoItem'],
    });
    if (!todo) {
      throw new HttpException(`Todo doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    return todo;
  }

  async findAll(from?: string, to?: string): Promise<Todo[]> {
    const userZone = moment.tz.guess(); // Asia/Saigon
    let optionWhere = {};
    if (from && to) {
      optionWhere = {
        /**
         * Example: {
         *  "from": "2023-07-07 11:07",
         *  "to": "2023-07-07 11:48"
         * }
         */
        created_at: Between(new Date(from), new Date(to)),
      };
    }

    const data = await this.todoRepository.find({
      where: optionWhere,
    });

    data.forEach((dat) => {
      dat.created_at = moment(dat.created_at)
        .tz(userZone)
        .format('YYYY-MM-DD HH:mm ZZ') as any;
    });

    return data;
  }
}
