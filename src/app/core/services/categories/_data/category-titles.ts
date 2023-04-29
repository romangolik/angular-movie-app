import { CategoriesEnum } from './categories.enum';
import { MediaTypesEnum } from '@rest/media/_types/media-types.enum';

export const CATEGORY_TITLES: { [key in MediaTypesEnum] : Map<CategoriesEnum, string> } = {
  [MediaTypesEnum.MOVIE]: new Map<CategoriesEnum, string>([
    [CategoriesEnum.Trending, 'Trending Movies'],
    [CategoriesEnum.Popular, 'Popular Movies'],
    [CategoriesEnum.TopRated, 'Top Rated Movies'],
    [CategoriesEnum.Upcoming, 'Upcoming Movies'],
    [CategoriesEnum.NowPlaying, 'Now Playing Movies'],
  ]),
  [MediaTypesEnum.TV]: new Map<CategoriesEnum, string>([
    [CategoriesEnum.Trending, 'Trending TV Shows'],
    [CategoriesEnum.Popular, 'Popular TV Shows'],
    [CategoriesEnum.TopRated, 'Top Rated TV Shows'],
    [CategoriesEnum.Upcoming, 'Currently Airing TV Shows'],
    [CategoriesEnum.NowPlaying, 'TV Shows Airing Today'],
  ])
};