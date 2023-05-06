import { Injectable } from '@angular/core';

import { MediaTypesEnum } from '@rest/media/_data/media-types.enum';
import { CategoriesEnum } from './_data/categories.enum';

import { CATEGORY_TITLES } from './_data/category-titles';

@Injectable()
export class CategoriesService {
  getTitle(mediaType: MediaTypesEnum, categoryType: CategoriesEnum): string {
    return CATEGORY_TITLES[mediaType].get(categoryType);
  }
}
