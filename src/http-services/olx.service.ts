import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class OlxService {
  URL_OLX_API =
    'https://www.olx.ua/api/v1/offers/?offset=40&limit=40&category_id=1532&region_id=18&city_id=369&filter_refiners=spell_checker&sl=18d7b472b17x42878f31';

  fetchData(): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .get(this.URL_OLX_API)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
}
