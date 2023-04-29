import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input } from '@angular/core';

import { fromEvent, take } from 'rxjs';

import { MediaCardImage } from './directives/media-card-sections.directive';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaCardComponent {
  @Input() data: any;

  @Input() routerLink: string | any[];
  @Input() voteAverage: number;
  @Input() showWatchNowButton = false;

  @ContentChild(MediaCardImage, {descendants: true})
  set image(value: MediaCardImage) {
    if (value) {
      const nativeElement = value._elementRef.nativeElement;

      this.hasImageSrc = !nativeElement.src.includes('default');

      if (!this.hasImageSrc) {
        this.imageLoaded();
      }
      
      fromEvent(nativeElement, 'load')
        .pipe(take(1))
        .subscribe(() => {
          this.imageLoaded();
        });
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  hasImageSrc = true;
  isImageLoaded = false;

  imageLoaded(): void {
    this.isImageLoaded = true;
    this.cdr.markForCheck();
  }
}
