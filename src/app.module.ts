import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/data-source';
import { logger } from './common/middleware/logger.middleware';
import { TodoController } from './todo/todo.controller';
import { RateLimitModule } from './rate-limit/rate-limit.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOption),
    RateLimitModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(TodoController);
  }
}
