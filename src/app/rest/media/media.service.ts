import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { MediaDto } from './_types/media.dto';
import { PagebleDto } from '@core/http/_types/pageble-response.dto';

@Injectable()
export class MediaService {
  constructor(private http: HttpService) {}

  search(params?: Params): Observable<PagebleDto<MediaDto>> {
    return this.http.getAllWithPagination<MediaDto>(
      'api/search/multi',
      params,
      MediaDto
    );
  }
}
