import { Component, Input, OnInit } from '@angular/core';

import { interval } from 'rxjs';

import { MovieDto } from '@rest/movies/_types/movie.dto';

import { IHeroSliderConfig } from './_types/hero-slider-config.interface';

import { DEFAULT_CONFIG } from './_data/default.config';

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss']
})
export class HeroSliderComponent implements OnInit {
  @Input() data: MovieDto[];
  @Input() config: IHeroSliderConfig = DEFAULT_CONFIG;

  nextSlide = 1;
  prevSlide: number;

  ngOnInit(): void {
    this.initSlider();
  }

  initSlider(): void {
    if (this.config.interval) {
      interval(this.config.interval).subscribe(() => this.shiftSliders(1));
    }
  }

  shiftSliders(shiftIndex: number): void {
    this.config.activeSlide =
      this.config.activeSlide === this.data.length - 1 ? 0 : this.config.activeSlide + shiftIndex;
    
    const nextSlideIndex = this.config.activeSlide + 1;
    const prevSlideIndex = this.config.activeSlide - 1;
    this.nextSlide = nextSlideIndex < this.data.length ? nextSlideIndex : 0;
    this.prevSlide = prevSlideIndex < 0 ? this.data.length - 1 : prevSlideIndex;
  }
}
