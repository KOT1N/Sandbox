import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bet } from '../../bet/entities/bet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  currentCount: number;

  @Column({ type: 'int' })
  countLimit: number;

  @OneToMany(() => Bet, (bet) => bet.user)
  bets: Bet[];
}
