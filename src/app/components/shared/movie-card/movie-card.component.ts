import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MovieDto } from '@rest/movies/_types/movie.dto';

import { MovieCardModesEnum } from './_data/movie-cards-mode.enum';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {
  @Input() data: MovieDto;
  @Input() mode: MovieCardModesEnum = MovieCardModesEnum.Normal;

  movieCardModesEnum = MovieCardModesEnum;
}
