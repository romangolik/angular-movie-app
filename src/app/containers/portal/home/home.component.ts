import { Component, OnInit } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { HomeFacade } from '@portal/home/home.facade';

import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';
import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sliderItems: ShortMovieDto[];

  $trendingMovies: Observable<ShortMovieDto[]>;
  $trendingTVShows: Observable<ShortTvShowDto[]>;

  constructor(private facade: HomeFacade) { }

  ngOnInit(): void {
    this.$trendingMovies = this.facade.getTrendingMovies()
      .pipe(tap(data => this.sliderItems = data.slice(0, 5)));

    this.$trendingTVShows = this.facade.getTrendingTvShows(); 
  }
}
