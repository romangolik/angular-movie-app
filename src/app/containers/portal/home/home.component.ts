import { Component, OnInit } from '@angular/core';

import { HomeFacade } from '@portal/home/home.facade';

import { MediaDto } from '@rest/media/_types/media.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: MediaDto[];
  tvShows: MediaDto[];
  sliderMovies: MediaDto[];

  constructor(private facade: HomeFacade) { }

  ngOnInit(): void {
    this.facade.getTrendingMovies()
      .subscribe(pagebleData => {
        this.movies = pagebleData.results;
        this.sliderMovies = pagebleData.results.slice(0, 5);
      });

    this.facade.getTrendingTvShows()
      .subscribe(pagebleData => this.tvShows = pagebleData.results); 
  }
}
