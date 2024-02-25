import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class RiaService {
  constructor(private httpService: HttpService) {}

  URL_RIA_API =
    'https://auto.ria.com/uk/bu/blocks/json/2554/255441/25544089?lang_id=4';

  fetchData() {
    return this.httpService
      .get(this.URL_RIA_API)
      .pipe(map((response) => response.data));
  }
}
