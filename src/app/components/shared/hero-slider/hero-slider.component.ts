import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

import { interval } from 'rxjs';

import { MovieDto } from '@rest/movies/_types/movie.dto';

import { IHeroSliderConfig } from './_types/hero-slider-config.interface';

import { DEFAULT_CONFIG } from './_data/default.config';

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss']
})
export class HeroSliderComponent {
  @Input() data: MovieDto[];
  @Input() config: IHeroSliderConfig = DEFAULT_CONFIG;

  @ViewChild('slidersContainer') slidersContainer: ElementRef;

  @ViewChild('slide')
  set slide(value: ElementRef) {
    if (value && this.slidersContainer) {
      this.width = value.nativeElement.offsetWidth;
      this.initSlider();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    this.shiftSliders(0);
  }

  value = 0;
  width: number;

  initSlider(): void {
    if (this.config.interval) {
      interval(this.config.interval).subscribe(() => this.shiftSliders(1));
    }
  }

  shiftSliders(shiftIndex: number): void {
    this.config.activeSlide =
      this.config.activeSlide === this.data.length - 1 ? 0 : this.config.activeSlide + shiftIndex;
    this.value = this.config.activeSlide * this.width;
  }
}
