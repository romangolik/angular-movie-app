import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MediaDto } from '@rest/media/_types/media.dto';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaCardComponent {
  @Input() data: MediaDto;

  isImageLoaded = false;

  imageLoaded(): void {
    this.isImageLoaded = true;
  }
}
