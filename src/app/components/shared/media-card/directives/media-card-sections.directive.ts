import {Directive, ElementRef} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Directive({
  selector: 'img[appMediaCardImage]',
  host: {
    'class': 'card__image-picture',
    '[loading]': '"lazy"',
    '(load)': 'onLoad()'
  },
})
export class MediaCardImage {
  loaded$ = new Subject<boolean>();

  constructor(public _elementRef: ElementRef<HTMLImageElement>) { }

  onLoad(): void {
    this.loaded$.next(true);
    this.loaded$.complete();
  }
}

@Directive({
  selector: '[appMediaCardHeading]',
  host: {
    'class': 'card__title',
  },
})
export class MediaCardHeading {
  constructor(public _elementRef: ElementRef<HTMLHeadingElement>) { }
}

@Directive({
  selector: '[appMediaCardParagraph]',
  host: {
    'class': 'card__paragraph',
  },
})
export class MediaCardParagraph {
  constructor(public _elementRef: ElementRef<HTMLParagraphElement>) { }
}