interface IPagebleDto<T> {
  results: T[];
  page: number;
  total_pages: number;
  DtoClass?: new (contentItem) => T;
}

export class PagebleDto<T> {
  results: T[];
  page: number;
  total_pages: number;
  DtoClass?: new (contentItem) => T;

  constructor(data?: IPagebleDto<T>) {
    if (data) {
      const { DtoClass } = data;
      this.results = DtoClass ? data.results?.map(contentItem => new DtoClass(contentItem)) : data.results;
      this.total_pages = data.total_pages;
      this.page = data.page;
    }
  }
}
