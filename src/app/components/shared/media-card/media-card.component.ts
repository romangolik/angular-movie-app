import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input } from '@angular/core';

import { MediaCardImage } from './directives/media-card-sections.directive';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaCardComponent {
  @Input() routerLink: string | any[];
  @Input() voteAverage: number;
  @Input() showWatchNowButton = false;

  @ContentChild(MediaCardImage, {descendants: true})
  set image(value: MediaCardImage) {
    if (value) {
      const nativeElement = value._elementRef.nativeElement;

      this.hasImageSrc = !nativeElement.src.includes('default');

      if (this.hasImageSrc) {
        value.loaded$
          .subscribe(() => this.imageLoaded());
      } else {
        this.imageLoaded();
      }
    }
  }

  hasImageSrc = true;
  isImageLoaded = false;

  constructor(private cdr: ChangeDetectorRef) {}

  imageLoaded(): void {
    this.isImageLoaded = true;
    this.cdr.markForCheck();
  }
}
