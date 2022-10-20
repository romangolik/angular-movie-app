import { NgModel } from '@angular/forms';
import { Directive, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebouncedChange]'
})
export class DebouncedChangeDirective implements OnDestroy {
  @Output()
  appDebouncedChange = new EventEmitter<any>();
  @Input()
  appNgModelChangeDebounceTime = 400;

  subscription: Subscription;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(private ngModel: NgModel) {
    this.subscription = this.ngModel.control.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(this.appNgModelChangeDebounceTime)
    ).subscribe((value) => {
      this.appDebouncedChange.emit(value);
    });
  }
}
