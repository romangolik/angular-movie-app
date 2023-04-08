import {
  Input,
  Component,
  ViewChild,
  QueryList,
  ElementRef,
  OnDestroy,
  ContentChildren,
  AfterContentInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';

import { ListItemComponent } from './list-item/list-item.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  @ViewChild('list') list: ElementRef;
  @ContentChildren(ListItemComponent, { read: ElementRef }) listItems: QueryList<ElementRef>;

  @Input() gap: number;

  listItem: ElementRef;
  listSyles: CSSStyleDeclaration;
  isPrevButtonHidden = true;
  isNextButtonHidden = false;
  intersectionObserver: IntersectionObserver;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.listItems.changes
      .pipe(take(1))
      .subscribe(queryList => {
        this.listItem = queryList.first;
        setTimeout(() => this.initIntersectionObserver(queryList.toArray()), 1000);
      });
  }

  ngAfterViewInit(): void {
    this.listSyles = getComputedStyle(this.list.nativeElement);
  }

  initIntersectionObserver(targets: ElementRef[]): void {
    const options = {
      root: this.list.nativeElement,
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
    const listWidth = this.list.nativeElement.clientWidth;
    const scrollPadding = +this.listSyles.getPropertyValue('--scroll-padding').replace('px', '');
    const listItemWidth = this.listItem.nativeElement.clientWidth;

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
    const listElement = this.list.nativeElement;

    listElement.scrollTo({
      left: listElement.scrollLeft - this.calculateOffsetWidth(),
      behavior: 'smooth',
    });
  }

  nextItems(): void {
    const listElement = this.list.nativeElement;

    listElement.scrollTo({
      left: listElement.scrollLeft + this.calculateOffsetWidth(),
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.intersectionObserver.disconnect();
  }
}
