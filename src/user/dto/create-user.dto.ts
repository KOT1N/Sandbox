import { Bet } from '../../bet/entities/bet.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min, ValidateNested } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @Min(0)
  @Max(10)
  @ApiProperty()
  currentCount: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty()
  countLimit: number;

  @ValidateNested()
  bets: Bet[];
}
