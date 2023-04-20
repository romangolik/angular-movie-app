import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MediaDto } from '@rest/media/_types/media.dto';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  @Input() hideInfo = false;
  @Input() mediaData: MediaDto;

  imageLoaded = false;

  imageLoadHandler(): void {
    this.imageLoaded = true;
  }
}
