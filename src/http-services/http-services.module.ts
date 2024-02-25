import { Module } from '@nestjs/common';
import { HttpServicesController } from './http-services.controller';
import { RiaService } from './ria.service';
import { OlxService } from './olx.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RiaService, OlxService],
  controllers: [HttpServicesController],
  exports: [RiaService, OlxService],
})
export class HttpServicesModule {}
