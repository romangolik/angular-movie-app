import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getImageLink',
  pure: true
})
export class GetImageLinkPipe implements PipeTransform {
  transform(value: string, size: string = 'w1920_and_h1080_face'): string {
    return `https://image.tmdb.org/t/p/${size}${value}`;
  }
}
