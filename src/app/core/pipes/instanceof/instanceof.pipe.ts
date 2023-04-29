import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instanceof',
  pure: true,
})
export class InstanceofPipe implements PipeTransform {
  transform<V, R>(value: V, type: new (...args: any[]) => R): R | undefined {
    return value instanceof type ? value : undefined;
  }
}
