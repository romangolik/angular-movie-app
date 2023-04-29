import { Constructor } from './constructor.type';
import { CustomFunction } from './function.type';

interface IPagebleDto<T> {
  results: T[];
  page: number;
  total_pages: number;
  DtoClass?: new (contentItem) => T;
  converFunction?: (contentItem) => T;
}

export class PagebleDto<T> {
  results: T[];
  page: number;
  total_pages: number;
  DtoClass?: new (contentItem) => T;
  converFunction?: (contentItem) => T;

  constructor(data?: IPagebleDto<T>) {
    if (data) {
      const { DtoClass, converFunction } = data;
      this.results = this.convertArray(data.results, DtoClass, converFunction);
      this.total_pages = data.total_pages;
      this.page = data.page;
    }
  }

  private convertArray(array: T[], DtoClass: Constructor<T>, converFunction: CustomFunction<T>): T[] {
    if (!array?.length) {
      return [];
    }

    if (DtoClass) {
      return array.map(contentItem => new DtoClass(contentItem));
    }

    if (converFunction) {
      return array.map(converFunction);
    }

    return array;
  }
}
