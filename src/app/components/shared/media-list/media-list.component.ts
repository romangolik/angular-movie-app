import { DOCUMENT } from '@angular/common';
import { 
  Input, 
  Output, 
  Inject,
  Component, 
  ViewChild,
  OnDestroy,
  ElementRef, 
  EventEmitter, 
  ChangeDetectionStrategy,
} from '@angular/core';

import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';
import { ShortPersonDto } from '@rest/persons/_type/short-person.dto';
import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

type MediaType = ShortMovieDto | ShortTvShowDto | ShortPersonDto;

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaListComponent implements OnDestroy {
  @ViewChild('listLoadTrigger')
  set listLoadTrigger(value: ElementRef) {
    if (value && this._canLoadMore) {
      this.initIntersectionObserver(value);
    }
  }

  @Input() data: MediaType[];
  @Input() positionToLoad = '500px';
  @Input()
  set canLoadMore(value: boolean) {
    this._canLoadMore = value;
    if (value === false) {
      this.disconnectObserver();
    }
  }
  get canLoadMore(): boolean {
    return this._canLoadMore;
  }

  @Output() loadMoreAction = new EventEmitter<void>();

  private _canLoadMore: boolean;

  intersectionObserver: IntersectionObserver;

  ShortMovieDto = ShortMovieDto;
  ShortTvShowDto = ShortTvShowDto;
  previewCards = new Array(20).fill(0);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  identify(index: number, item: MediaType): number {
    return item.id;
  }

  initIntersectionObserver(target: ElementRef): void {
    const options = {
      root: this.document,
      rootMargin: '0px',
      thresholds: 0.01
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.loadMoreAction.emit();
      }
    }, options);

    this.intersectionObserver.observe(target.nativeElement);
  }

  disconnectObserver(): void {
    this.intersectionObserver?.disconnect();
  }

  ngOnDestroy(): void {
    this.disconnectObserver();
  }
}
