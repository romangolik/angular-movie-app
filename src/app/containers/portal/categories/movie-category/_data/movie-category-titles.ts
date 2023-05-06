import { CategoriesEnum } from '@core/enums/categories.enum';

export const MOVIE_CATEGORY_TITLES = new Map<CategoriesEnum, string>([
  [CategoriesEnum.Trending, 'Trending Movies'],
  [CategoriesEnum.Popular, 'Popular Movies'],
  [CategoriesEnum.TopRated, 'Top Rated Movies'],
  [CategoriesEnum.Upcoming, 'Upcoming Movies'],
  [CategoriesEnum.NowPlaying, 'Now Playing Movies'],
]);