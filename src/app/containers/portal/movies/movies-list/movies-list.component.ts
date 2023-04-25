import { Component, OnInit } from '@angular/core';

import { Observable, take } from 'rxjs';

import { MoviesListFacade } from './movies-list.facade';

import { MediaDto } from '@rest/media/_types/media.dto';

import { CategoriesEnum } from '@core/services/categories/_data/categories.enum';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  $sliderItems: Observable<MediaDto[]>;
  $popularMovies: Observable<MediaDto[]>;
  $topRatedMovies: Observable<MediaDto[]>;
  $upcomingMovies: Observable<MediaDto[]>;
  $nowPlayingMovies: Observable<MediaDto[]>;

  categoriesEnum = CategoriesEnum;

  constructor(private facade: MoviesListFacade) {}

  ngOnInit(): void {
    this.$sliderItems = this.facade.getTrending().pipe(take(5));
    this.$popularMovies = this.facade.getPopular();
    this.$topRatedMovies = this.facade.getTopRated();
    this.$upcomingMovies = this.facade.getUpcoming();
    this.$nowPlayingMovies = this.facade.getNowPlaying();
  }
}
