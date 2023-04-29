import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';
import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

import { MediaTypesEnum } from '@rest/media/_data/media-types.enum';

interface IShortPerson {
  profile_path: string | null;
  adult: boolean;
  id: number;
  media_type: MediaTypesEnum.PERSON;
  known_for: (ShortMovieDto | ShortTvShowDto)[];
  name: string;
  popularity: number;
}

export class ShortPersonDto implements IShortPerson {
  profile_path: string | null;
  adult: boolean;
  id: number;
  media_type: MediaTypesEnum.PERSON;
  known_for: (ShortMovieDto | ShortTvShowDto)[];
  name: string;
  popularity: number;

  constructor(data: IShortPerson) {
    this.profile_path = data.profile_path ?? null;
    this.adult = data.adult;
    this.id = data.id;
    this.media_type = MediaTypesEnum.PERSON;
    this.known_for = data.known_for ? 
      data.known_for.map(item => item.media_type === MediaTypesEnum.MOVIE ? new ShortMovieDto(item) : new ShortTvShowDto(item)) : 
      [];
    this.name = data.name;
    this.popularity = data.popularity;
  }
}