import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from '../../db/redis-sourse';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'MEMORY_CACHE',
      useFactory: () =>
        CacheModule.register({
          max: 100,
          ttl: 5,
        }),
    },
    {
      provide: 'REDIS_CACHE',
      useFactory: () => CacheModule.register(RedisOptions),
    },
  ],
  exports: [UserService, 'MEMORY_CACHE', 'REDIS_CACHE'],
})
export class UserModule {}
