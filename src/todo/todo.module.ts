import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoItem } from './entities/todo-item.entity';
import { TodoItemController } from './todo-item/todo-item.controller';
import { TodoItemService } from './todo-item/todo-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoItem])],
  controllers: [TodoController, TodoItemController],
  providers: [TodoService, TodoItemService],
  exports: [],
})
export class TodoModule {}
