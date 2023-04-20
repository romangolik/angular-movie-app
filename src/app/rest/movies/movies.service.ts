import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '@core/http/http.service';

import { MediaDto } from '@rest/media/_types/media.dto';
import { PagebleDto } from '@core/http/_types/pageble-response.dto';

@Injectable()
export class MoviesService {
  path = 'api/movie';

  constructor(private http: HttpService) { }

  getTrending(params?: Params): Observable<PagebleDto<MediaDto>> {
    return this.http.getAllWithPagination<MediaDto>(
      'api/trending/movie/week',
      params,
      MediaDto,
    );
  }
}
