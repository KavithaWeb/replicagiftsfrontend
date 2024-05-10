import { Component } from '@angular/core';
import { CommonModule, IMAGE_CONFIG } from '@angular/common';
import { Router, RouterOutlet, NavigationStart } from '@angular/router';
import { FooterComponent } from './partials/footer/footer.component';
import { HeaderAllComponent } from './partials/header-all/header-all.component';
import { RouterService } from './service/router.service';
import AOS from 'aos';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderAllComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
  ],
})
export class AppComponent {
  title = 'ReplicaGifts';
  isRootRoute = true; // Assuming the initial route is the root route
  admin = false;

  display = "";

  constructor(private router: Router, private routerService: RouterService) { }

  ngOnInit(): void {

    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true // Animations only occur once
    });
    AOS.init();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isRootRoute = (event.url === '/' || event.url.includes('/#contact'));
        this.display = event.url;
        this.admin = this.routerService.isRouteAdmin();
      }
    });





  }
  get isAdminRoute() {
    return this.routerService.isRouteAdmin();
  }
}
