import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RouterService {
  isAdminRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAdminRoute = this.checkIfAdminRoute(event.url);
    });
  }

  private checkIfAdminRoute(url: string): boolean {
    return url.includes('/admin');
  }

  isRouteAdmin(): boolean {
    return this.isAdminRoute;
  }
}
