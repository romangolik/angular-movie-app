import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';
import { ShortPersonDto } from '@rest/persons/_type/short-person.dto';
import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

export type SearchResult = ShortMovieDto | ShortTvShowDto | ShortPersonDto;