import { Module } from '@nestjs/common';
import { BasicCommand } from './commands/basic.command';
import { BetModule } from './bet/bet.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), BetModule, UserModule],
  providers: [BasicCommand],
})
export class AppModule {}
