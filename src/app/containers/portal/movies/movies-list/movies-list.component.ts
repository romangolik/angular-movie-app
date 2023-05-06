import { Component, OnInit } from '@angular/core';

import { Observable, take } from 'rxjs';

import { MoviesListFacade } from './movies-list.facade';

import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';

import { CategoriesEnum } from '@core/enums/categories.enum';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  $sliderItems: Observable<ShortMovieDto[]>;
  $popular: Observable<ShortMovieDto[]>;
  $topRated: Observable<ShortMovieDto[]>;
  $upcoming: Observable<ShortMovieDto[]>;
  $nowPlaying: Observable<ShortMovieDto[]>;

  categoriesEnum = CategoriesEnum;

  constructor(private facade: MoviesListFacade) {}

  ngOnInit(): void {
    this.$sliderItems = this.facade.getTrending().pipe(take(5));
    this.$popular = this.facade.getPopular();
    this.$topRated = this.facade.getTopRated();
    this.$upcoming = this.facade.getUpcoming();
    this.$nowPlaying = this.facade.getNowPlaying();
  }
}
