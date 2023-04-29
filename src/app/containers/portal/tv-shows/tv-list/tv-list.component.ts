import { Component, OnInit } from '@angular/core';

import { Observable, take } from 'rxjs';

import { TvListFacade } from './tv-list.facade';

import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.scss']
})
export class TvListComponent implements OnInit {
  $sliderItems: Observable<ShortTvShowDto[]>;
  $popular: Observable<ShortTvShowDto[]>;
  $topRated: Observable<ShortTvShowDto[]>;
  $currentlyAiring: Observable<ShortTvShowDto[]>;
  $airingToday: Observable<ShortTvShowDto[]>;

  constructor(private facade: TvListFacade) {}

  ngOnInit(): void {
    this.$sliderItems = this.facade.getTrending().pipe(take(5));
    this.$popular = this.facade.getPopular();
    this.$topRated = this.facade.getTopRated();
    this.$currentlyAiring = this.facade.getCurrentlyAiring();
    this.$airingToday = this.facade.getAiringToday();
  }
}
