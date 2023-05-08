import { DOCUMENT } from '@angular/common';
import { 
  Input, 
  Output, 
  Inject,
  Component, 
  ViewChild,
  OnDestroy,
  QueryList,
  ElementRef, 
  EventEmitter, 
  ContentChildren,
  AfterContentInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import { take } from 'rxjs';

import { ShortMovieDto } from '@rest/movies/_types/short-movie.dto';
import { ShortTvShowDto } from '@rest/tv-shows/_types/short-tv-show.dto';

import { MediaListItemComponent } from './media-list-item/media-list-item.component';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaListComponent implements AfterContentInit, OnDestroy {
  @ViewChild('listLoadTrigger')
  set listLoadTrigger(value: ElementRef) {
    if (value) {
      this.initIntersectionObserver(value);
    }
  }
  @ContentChildren(MediaListItemComponent) listItems: QueryList<MediaListItemComponent>;

  @Input() positionToLoad = '500px';
  @Input() canLoadMore: boolean;

  @Output() loadMoreAction = new EventEmitter<void>();

  intersectionObserver: IntersectionObserver;

  ShortMovieDto = ShortMovieDto;
  ShortTvShowDto = ShortTvShowDto;
  previewCards = new Array(20).fill(0);

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngAfterContentInit(): void {
    this.listItems.changes
      .pipe(take(1))
      .subscribe(() => {
        this.previewCards = [];
        this.cdr.markForCheck();
      });
  }

  initIntersectionObserver(target: ElementRef): void {
    const options = {
      root: this.document,
      rootMargin: '0px',
      thresholds: 0.01
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && this.canLoadMore) {
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
