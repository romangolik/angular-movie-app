export type RequestOptions<T> = {
  DtoClass: new (responseValue) => T;
};
