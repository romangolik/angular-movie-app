export class PagebleDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pagesCount: number;
  DtoClass?: new (contentItem) => T;

  constructor(data?: PagebleDto<T>) {
    if (data) {
      const { DtoClass } = data;
      this.data = DtoClass ? data.data?.map(contentItem => new DtoClass(contentItem)) : data.data;
      this.total = data.total;
      this.pagesCount = data.pagesCount;
      this.page = data.page;
      this.limit = data.limit;
    }
  }
}
