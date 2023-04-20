import { Component, OnInit } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { MoviesListFacade } from './movies-list.facade';

import { MediaDto } from '@rest/media/_types/media.dto';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  sliderItems: MediaDto[];
  $trendingMovies: Observable<MediaDto[]>;
  $popularMovies: Observable<MediaDto[]>;
  $topRatedMovies: Observable<MediaDto[]>;
  $upcomingMovies: Observable<MediaDto[]>;
  $nowPlayingMovies: Observable<MediaDto[]>;

  constructor(private facade: MoviesListFacade) {}

  ngOnInit(): void {
    this.$trendingMovies = this.facade.getTrending()
      .pipe(tap(data => this.sliderItems = data.slice(0, 5)));
    this.$popularMovies = this.facade.getPopular();
    this.$topRatedMovies = this.facade.getTopRated();
    this.$upcomingMovies = this.facade.getUpcoming();
    this.$nowPlayingMovies = this.facade.getNowPlaying();
  }
}
