import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  previous: number;

  @Column({ type: 'int' })
  next: number;

  @Column({ type: 'int' })
  count: number;

  @ManyToOne(() => User, (user) => user.bets)
  @JoinColumn({ name: 'userId' })
  user: User;
}
