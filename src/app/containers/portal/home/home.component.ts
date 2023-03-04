import { Component, OnInit } from '@angular/core';

import { HomeFacade } from '@portal/home/home.facade';

import { MovieDto } from '@rest/movies/_types/movie.dto';


import { MovieCardModesEnum } from '@components/shared/movie-card/_data/movie-cards-mode.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: MovieDto[];
  sliderMovies: MovieDto[];

  movieCardModesEnum = MovieCardModesEnum;

  constructor(private facade: HomeFacade) { }

  ngOnInit(): void {
    this.facade.getPopular()
      .subscribe(data => {
        this.movies = data;
        this.sliderMovies = data.slice(0, 5);
      });
  }
}
