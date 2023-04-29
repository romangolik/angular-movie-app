import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';
import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

type MediaType = (ShortMovieDto | ShortTvShowDto);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  @Input() hideInfo = false;
  @Input()
  set data(value: MediaType ) {
    if (value) {
      this.title = value instanceof ShortMovieDto ? value.title : value.name;
      this._data = value;
    }
  }
  get data(): MediaType {
    return this._data;
  }

  private _data: MediaType;
  
  title: string;
  
  imageLoaded = false;

  imageLoadHandler(): void {
    this.imageLoaded = true;
  }
}
