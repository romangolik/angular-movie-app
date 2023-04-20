import { Component, OnInit } from '@angular/core';

import { HomeFacade } from '@portal/home/home.facade';

import { MediaDto } from '@rest/media/_types/media.dto';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: MediaDto[];
  tvShows: MediaDto[];
  sliderItems: MediaDto[];

  $trendingMovies: Observable<MediaDto[]>;
  $trendingTVShows: Observable<MediaDto[]>;

  constructor(private facade: HomeFacade) { }

  ngOnInit(): void {
    this.$trendingMovies = this.facade.getTrendingMovies()
      .pipe(tap(data => this.sliderItems = data.slice(0, 5)));

    this.$trendingTVShows = this.facade.getTrendingTvShows(); 
  }
}
