import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItem } from '../entities/todo-item.entity';
import { Repository } from 'typeorm';
import { CreateTodoItemDto } from '../dto/create-todo-item.dto';
import { UpdateTodoItemDto } from '../dto/update-todo-item.dto';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItem)
    private todoItemRepository: Repository<TodoItem>,
  ) {}

  async create(todoItem: CreateTodoItemDto) {
    if (!todoItem.name) {
      throw new HttpException(
        'Field name is not empty!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = this.todoItemRepository.create(todoItem);
    result.created_at = new Date();

    return await this.todoItemRepository.save(result);
  }

  async update(id: number, todoItem: UpdateTodoItemDto) {
    const todoItemUpdate = await this.todoItemRepository.findOneBy({ id });
    if (!todoItemUpdate) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.todoItemRepository.update({ id }, todoItem);
  }

  async delete(id: number) {
    const todoItem = await this.todoItemRepository.findOneBy({ id });
    if (!todoItem) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.todoItemRepository.delete({ id });
  }

  async findOne(id: number): Promise<TodoItem | null> {
    const todoItem = await this.todoItemRepository.findOneBy({ id });
    if (!todoItem) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return todoItem;
  }

  async findAll(): Promise<TodoItem[]> {
    const data = await this.todoItemRepository.find({
      where: {},
    });

    return data;
  }
}
