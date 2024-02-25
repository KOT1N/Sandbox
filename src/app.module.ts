import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { BasicCommand } from './commands/basic.command';
import { BetModule } from './bet/bet.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheMiddleware } from './middlewares/cache.middleware';
import { UserController } from './user/user.controller';
import { HttpServicesModule } from './http-services/http-services.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CacheModule.register(),
    BetModule,
    UserModule,
    HttpServicesModule,
  ],
  providers: [BasicCommand],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheMiddleware).forRoutes(UserController);
  }
}
