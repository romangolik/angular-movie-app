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
      .subscribe(data => {
        this.movies = data;
        this.sliderMovies = data.slice(0, 5);
      });

    this.facade.getTrendingTvShows()
      .subscribe(data => this.tvShows = data); 
  }
}
