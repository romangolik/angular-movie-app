import { CategoriesEnum } from '@core/enums/categories.enum';

export const TV_SHOW_CATEGORY_TITLES = new Map<CategoriesEnum, string>([
  [CategoriesEnum.Trending, 'Trending TV Shows'],
  [CategoriesEnum.Popular, 'Popular TV Shows'],
  [CategoriesEnum.TopRated, 'Top Rated TV Shows'],
  [CategoriesEnum.Upcoming, 'Currently Airing TV Shows'],
  [CategoriesEnum.NowPlaying, 'TV Shows Airing Today'],
]);