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
      interval(this.config.interval).subscribe(() => this.shiftSliders());
    }
  }

  shiftSliders(): void {
    const nextIndex = this.config.activeSlide + 1;

    this.config.activeSlide = this.calculateValidIndex(nextIndex);
    
    this.nextSlide = this.calculateValidIndex(this.config.activeSlide + 1);
    this.prevSlide = this.calculateValidIndex(this.config.activeSlide - 1);
  }

  calculateValidIndex(value: number): number {
    const arrayLength = this.data.length;

    return (value + arrayLength) % arrayLength;
  }
}
