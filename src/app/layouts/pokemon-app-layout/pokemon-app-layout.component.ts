import { Component, OnDestroy } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'p-pokemon-app-layout',
  templateUrl: './pokemon-app-layout.component.html',
})
export class PokemonAppLayoutComponent implements OnDestroy {
  routeLoading = true;
  private subRouterEvents;

  constructor(private router: Router) {
    this.subRouterEvents = this.router.events.subscribe((routerEvent) => {
      this.checkRouterEvent(routerEvent as RouterEvent);
    });
  }

  private checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.showRouterLoading();
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.hideRouterLoading();
    }
  }

  private hideRouterLoading() {
    this.routeLoading = false;
  }

  private showRouterLoading() {
    this.routeLoading = true;
  }

  ngOnDestroy(): void {
    this.subRouterEvents.unsubscribe();
  }
}
