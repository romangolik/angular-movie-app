import {
  Input,
  Component,
  ViewChild,
  QueryList,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  ContentChildren,
  AfterContentInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import { take } from 'rxjs';

import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  @ViewChild('carousel') carousel: ElementRef;
  @ContentChildren(CarouselItemComponent, { read: ElementRef }) carouselItems: QueryList<ElementRef>;

  @Input() gap: number;

  carouselItem: ElementRef;
  carouselSyles: CSSStyleDeclaration;
  isPrevButtonHidden = true;
  isNextButtonHidden = false;
  intersectionObserver: IntersectionObserver;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.carouselItems.changes
      .pipe(take(1))
      .subscribe(queryList => {
        this.carouselItem = queryList.first;
        setTimeout(() => this.initIntersectionObserver(queryList.toArray()), 1000);
      });
  }

  ngAfterViewInit(): void {
    this.carouselSyles = getComputedStyle(this.carousel.nativeElement);
  }

  initIntersectionObserver(targets: ElementRef[]): void {
    const options = {
      root: this.carousel.nativeElement,
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

  calculateOffsetWidth(): number {
    const listWidth = this.carousel.nativeElement.clientWidth;
    const scrollPadding = +this.carouselSyles.getPropertyValue('--scroll-padding').replace('px', '');
    const listItemWidth = this.carouselItem.nativeElement.clientWidth;

    const maximalOffsetWidth = listWidth - listItemWidth - this.gap - scrollPadding;

    let i = 0;
    let offsetWidth = 0;

    while (offsetWidth <= maximalOffsetWidth) {
      offsetWidth += listItemWidth;

      if (i !== 0) {
        offsetWidth += this.gap;
      }

      i++;
    }

    return offsetWidth;
  }

  prevItems(): void {
    const listElement = this.carousel.nativeElement;

    listElement.scrollTo({
      left: listElement.scrollLeft - this.calculateOffsetWidth(),
      behavior: 'smooth',
    });
  }

  nextItems(): void {
    const listElement = this.carousel.nativeElement;

    listElement.scrollTo({
      left: listElement.scrollLeft + this.calculateOffsetWidth(),
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.intersectionObserver.disconnect();
  }
}
