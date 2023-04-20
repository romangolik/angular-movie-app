import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { MoviesService } from '@rest/movies/movies.service';
import { TvShowsService } from '@rest/tv-shows/tv-shows.service';

import { MediaDto } from '@rest/media/_types/media.dto';
import { PagebleDto } from '@core/http/_types/pageble-response.dto';

@Injectable()
export class HomeFacade {
  constructor(
    private moviesService: MoviesService,
    private tvShowsService: TvShowsService
  ) {}

  getTrendingMovies(params?: Params): Observable<PagebleDto<MediaDto>> {
    return this.moviesService.getTrending({
      'language': 'en-US',
      'page': '1',
      ...params
    });
  }

  getTrendingTvShows(params?: Params): Observable<PagebleDto<MediaDto>> {
    return this.tvShowsService.getTrending({
      'language': 'en-US',
      'page': '1',
      ...params
    });
  }
}
