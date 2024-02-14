import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import Redis from 'ioredis';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('REDIS') private readonly redisClient: Redis,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const cacheKey = `user:${id}`;
    let user: User = await this.cacheManager.get(cacheKey);

    if (!user) {
      console.log('Getting from db');
      user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      await this.cacheManager.set(cacheKey, user);
      await this.redisClient.set(cacheKey, JSON.stringify(user));
    }

    if (!user) {
      console.log('Getting from redis');
      const redisUser = await this.redisClient.get(cacheKey);
      if (redisUser) {
        user = JSON.parse(redisUser);
      } else {
        throw new NotFoundException(`User with ID ${id} not found in cache`);
      }
    }
    return user;
  }

  async getCountLimitById(id: number): Promise<number> {
    const entity = await this.userRepository.findOne({ where: { id: id } });
    if (!entity) {
      throw new Error(`Entity with ID ${id} not found`);
    }
    return entity.countLimit;
  }

  async getCurrentCountById(id: number): Promise<number> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error(`Entity with ID ${id} not found`);
    }
    return user.currentCount;
  }

  async addToCurrentCountById(id: number, added: number): Promise<number> {
    const entity = await this.userRepository.findOne({ where: { id: id } });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    const currentCount = parseInt(String(entity.currentCount));
    const countLimit = await this.getCountLimitById(id);

    if (currentCount + parseInt(String(added)) > countLimit) {
      throw new BadRequestException(
        `Cannot add ${added} to current count for user with ID ${id}. It would exceed the count limit of ${countLimit}`,
      );
    }

    entity.currentCount = currentCount + parseInt(String(added));

    await this.userRepository.save(entity);

    return entity.currentCount;
  }
}
