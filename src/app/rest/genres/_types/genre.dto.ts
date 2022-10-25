interface IGenreDto {
  id: number;
  name: string;
}

export class GenreDto {
  id: number;
  name: string;

  constructor(data: IGenreDto) {
    this.id = data.id;
    this.name = data.name;
  }
}
