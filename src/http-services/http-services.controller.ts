import { Controller, Get } from '@nestjs/common';
import { OlxService } from './olx.service';
import { RiaService } from './ria.service';
import { map } from 'rxjs';
import { forkJoin } from 'rxjs';

@Controller('http-services')
export class HttpServicesController {
  constructor(
    private olxService: OlxService,
    private riaService: RiaService,
  ) {}

  @Get()
  getData() {
    return forkJoin({
      olx: this.olxService.fetchData(),
      ria: this.riaService.fetchData(),
    }).pipe(
      map((results) => ({
        olxData: results.olx,
        riaData: results.ria,
      })),
    );
  }
}
