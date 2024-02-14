import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
import Redis from 'ioredis';

const redisProvider = {
  provide: 'REDIS',
  useFactory: () =>
    new Redis({
      port: 6379,
      host: 'redis',
    }),
};

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), CacheModule.register()],
  controllers: [UserController],
  providers: [UserService, redisProvider],
  exports: [UserService, 'REDIS'],
})
export class UserModule {}
