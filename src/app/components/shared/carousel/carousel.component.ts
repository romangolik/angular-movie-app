import {
  Input,
  Component,
  OnDestroy,
  ViewChild,
  QueryList,
  ElementRef,
  ContentChildren,
  AfterContentInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import { take } from 'rxjs';

import { CarouselItemComponent } from './carousel-item/carousel-item.component';

const SCROLL_PADIING = 100;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements AfterContentInit, OnDestroy {
  @ViewChild('carousel') 
  set carousel(value: ElementRef) {
    if (value) {
      this.carouselNativeElement = value.nativeElement;
      this.carouselWidth = value.nativeElement.clientWidth;
    }
  }
  @ContentChildren(CarouselItemComponent, { read: ElementRef }) carouselItems: QueryList<ElementRef>;

  @Input() gap: number;

  carouselWidth: number;
  itemsPositions: number[];
  visibleItemsCount: number;
  carouselItemWidth: number;
  intersectionObserver: IntersectionObserver;
  carouselNativeElement: HTMLElement;

  currentItemIndex = 0;
  isPrevButtonHidden = true;
  isNextButtonHidden = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.carouselItems.changes
      .pipe(take(1))
      .subscribe(queryList => {
        this.carouselItemWidth = queryList.first.nativeElement.clientWidth;
        this.itemsPositions = this.calculateItemsPositions(queryList.toArray());
        this.visibleItemsCount = this.calculateVisibleElementsCount();
        setTimeout(() => this.initIntersectionObserver(queryList.toArray()), 1000);
      });
  }

  calculateItemsPositions(carouselItems: ElementRef[]): number[] {
    return carouselItems.map((item, index) => {
      return (this.carouselItemWidth + this.gap) * index; 
    });
  }

  calculateVisibleElementsCount(): number {
    let count = 1;
    let width = this.carouselItemWidth;

    const maximalOffsetWidth = this.carouselWidth - SCROLL_PADIING;

    while(true) {
      width += this.carouselItemWidth + this.gap;

      if (width > maximalOffsetWidth) {
        break;
      }

      count++;
    }

    return count;
  }

  initIntersectionObserver(targets: ElementRef[]): void {
    const options = {
      root: this.carouselNativeElement,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const firstListItem = targets[0].nativeElement;
    const lastListIem = targets[targets.length - 1].nativeElement;

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === firstListItem) {
          this.isPrevButtonHidden = entry.isIntersecting;
        }
        if (entry.target === lastListIem) {
          this.isNextButtonHidden = entry.isIntersecting;
        }
        this.cdr.markForCheck();
      });
    }, options);

    this.intersectionObserver.observe(firstListItem);
    this.intersectionObserver.observe(lastListIem);
  }

  calculateNextItemIndex(direction: number): number {
    const maxValue = this.carouselItems.length - 1;
    const nextIndex = this.currentItemIndex + this.visibleItemsCount * direction;

    if (nextIndex <= 0) {
      return 0;
    }

    if (nextIndex >= maxValue) {
      return maxValue;
    }

    return nextIndex;
  }

  calculateOffsetWidth(): number {
    const scrollPadding = 50 * 2;
    const maximalOffsetWidth = this.carouselWidth - this.carouselItemWidth - this.gap - scrollPadding;

    let i = 0;
    let offsetWidth = 0;

    while (offsetWidth <= maximalOffsetWidth) {
      offsetWidth += this.carouselItemWidth;

      if (i !== 0) {
        offsetWidth += this.gap;
      }

      i++;
    }

    return offsetWidth - this.gap;
  }

  prevItems(): void {
    this.currentItemIndex = this.calculateNextItemIndex(-1);

    this.carouselNativeElement.scrollTo({
      left: this.itemsPositions[this.currentItemIndex],
      behavior: 'smooth',
    });
  }

  nextItems(): void {
    this.currentItemIndex = this.calculateNextItemIndex(1);

    this.carouselNativeElement.scrollTo({
      left: this.itemsPositions[this.currentItemIndex],
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.intersectionObserver.disconnect();
  }
}
