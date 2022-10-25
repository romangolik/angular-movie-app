import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getImageLink',
  pure: true
})
export class GetImageLinkPipe implements PipeTransform {
  transform(value: string, size: string = 'original'): string {
    return `https://image.tmdb.org/t/p/${size}${value}`;
  }
}
