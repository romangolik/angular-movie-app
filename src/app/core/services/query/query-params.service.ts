import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';

@Injectable()
export class QueryParamsService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  private navigateRouter(queryParams: Params, options: NavigationExtras = { queryParamsHandling: 'merge' }, path?) {
    let commands = [];
    let relativeTo = this.activatedRoute;
    if (path) {
      commands = [ path ];
      relativeTo = null;
    }
    return this.router.navigate(commands, {
      ...options,
      queryParams,
      relativeTo
    });
  }

  addQueryParams(params: Params, path?: string): void {
    this.navigateRouter(params, {
      queryParamsHandling: 'merge'
    }, path);
  }

  updateQueryParams(params: Params, path?: string): void {
    this.navigateRouter(params, {
      queryParamsHandling: ''
    }, path);
  }
}
