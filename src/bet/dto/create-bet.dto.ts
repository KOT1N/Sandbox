import { User } from '../../user/entities/user.entity';
import { IsInt, Max, Min, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBetDto {
  @IsInt()
  id: number;

  @IsInt()
  @Min(0)
  @Max(10)
  @ApiProperty()
  previous: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty()
  next: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty()
  count: number;

  @ValidateNested()
  @ApiProperty({ type: () => User })
  user: User;
}
