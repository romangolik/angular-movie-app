import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MovieDto } from '@rest/movies/_types/movie.dto';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {
  @Input() data: MovieDto;

  isImageLoaded = false;

  imageLoaded(): void {
    this.isImageLoaded = true;
  }
}
