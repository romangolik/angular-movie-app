import { Component, OnInit } from '@angular/core';

import { Observable, take } from 'rxjs';

import { TvListFacade } from './tv-list.facade';

import { MediaDto } from '@rest/media/_types/media.dto';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.scss']
})
export class TvListComponent implements OnInit {
  $sliderItems: Observable<MediaDto[]>;
  $popularMovies: Observable<MediaDto[]>;
  $topRatedMovies: Observable<MediaDto[]>;
  $currentlyAiring: Observable<MediaDto[]>;
  $airingToday: Observable<MediaDto[]>;

  constructor(private facade: TvListFacade) {}

  ngOnInit(): void {
    this.$sliderItems = this.facade.getTrending().pipe(take(5));
    this.$popularMovies = this.facade.getPopular();
    this.$topRatedMovies = this.facade.getTopRated();
    this.$currentlyAiring = this.facade.getCurrentlyAiring();
    this.$airingToday = this.facade.getAiringToday();
  }
}
