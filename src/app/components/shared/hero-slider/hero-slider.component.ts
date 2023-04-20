import {
  Input,
  OnInit,
  OnDestroy,
  Component,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import {
  never,
  Subject,
  interval,
  switchMap,
  takeUntil,
  BehaviorSubject,
} from 'rxjs';

import { MediaDto } from '@rest/media/_types/media.dto';

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  @HostListener('window:focus')
  onFocus(): void {
    this.playing.next(true);
  }

  @HostListener('window:blur')
  onBlur(): void {
    this.playing.next(false);
  }

  @Input() 
  set data(value: MediaDto[]) {
    if (value && value.length) {
      this._data = value;
      this.setIndexes(this.activeSlide);
    }
  }
  get data(): MediaDto[] {
    return this._data;
  }
  @Input() interval = 5000;

  private _data: MediaDto[];
  private destroy$ = new Subject<void>();
  private playing = new BehaviorSubject(true);

  activeSlide = 0;
  nextSlide: number;
  prevSlide: number;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initSlider();
  }

  initSlider(): void {
    this.playing
      .pipe(
        switchMap((status) =>
          status ? interval(this.interval).pipe(takeUntil(this.destroy$)) : never()
        ),
        takeUntil(this.destroy$)
      ).subscribe(() => this.changeSlide());
  }

  changeSlide(): void {
    const nextIndex = this.activeSlide + 1;

    this.setIndexes(nextIndex);
  }

  setIndexes(activeIndex: number): void {
    this.activeSlide = this.calculateIndex(activeIndex);
    this.nextSlide = this.calculateIndex(this.activeSlide + 1);
    this.prevSlide = this.calculateIndex(this.activeSlide - 1);

    this.cdr.markForCheck();
  }

  calculateIndex(value: number): number {
    const arrayLength = this.data.length;

    return (value + arrayLength) % arrayLength;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
