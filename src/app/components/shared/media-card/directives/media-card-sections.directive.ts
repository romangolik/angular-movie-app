import {Directive, ElementRef, Inject, Optional} from '@angular/core';

@Directive({
  selector: '[appMediaCardImage]',
  host: {
    'class': 'card__image-picture',
    '[loading]': '"lazy"'
  },
})
export class MediaCardImage {
  constructor(public _elementRef: ElementRef<HTMLImageElement>) { }
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