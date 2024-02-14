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
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('MEMORY_CACHE')
    private memoryCache: Cache,
    @Inject('REDIS_CACHE')
    private redisCache: Cache,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
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
