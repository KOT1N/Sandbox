import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { BetService } from './bet.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Bet')
@Controller('bet')
export class BetController {
  constructor(private readonly betService: BetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bet' })
  @ApiResponse({
    status: 201,
    description: 'The bet has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(
    @Query('userId') userId: number,
    @Query('addedCount') addedCount: number,
  ) {
    return await this.betService.create(userId, addedCount);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bets' })
  @ApiResponse({ status: 200, description: 'List of all bets' })
  findAll() {
    return this.betService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a bet by ID' })
  @ApiParam({ name: 'id', description: 'Bet ID', type: Number })
  @ApiResponse({ status: 200, description: 'The bet with the specified ID' })
  @ApiResponse({ status: 404, description: 'Bet not found' })
  findOne(@Param('id') id: string) {
    return this.betService.findOne(+id);
  }
}
