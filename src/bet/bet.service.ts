import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private readonly betRepository: Repository<Bet>,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, addedCount: number) {
    try {
      const timeoutDuration = 17000;
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'));
        }, timeoutDuration);
      });

      await new Promise((resolve) => setTimeout(resolve, 20000));

      return await Promise.race([
        this.performCreateOperations(userId, addedCount),
        timeoutPromise,
      ]);
    } catch (error) {
      throw new HttpException('Request timed out', HttpStatus.REQUEST_TIMEOUT);
    }
  }

  private async performCreateOperations(userId: number, addedCount: number) {
    const user = await this.userService.findOne(userId);
    const previous = await this.userService.getCurrentCountById(userId);
    const next = await this.userService.addToCurrentCountById(
      userId,
      addedCount,
    );

    const createBetDto = new CreateBetDto();
    createBetDto.user = user;
    createBetDto.previous = previous;
    createBetDto.next = next;
    createBetDto.count = addedCount;

    return await this.betRepository.save(createBetDto);
  }

  async findAll() {
    return await this.betRepository.find();
  }

  async findOne(id: number) {
    return await this.betRepository.findOne({ where: { id: id } });
  }
}
