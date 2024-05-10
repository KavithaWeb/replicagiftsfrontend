import { Component, Input } from '@angular/core';
import { UserAuthService } from '../../service/user-auth.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { WishService } from '../../service/wish.service';
import { CartService } from '../../service/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { GuestService } from '../../service/guest.service';

@Component({
  selector: 'app-header-all',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './header-all.component.html',
  styleUrl: './header-all.component.css'
})
export class HeaderAllComponent {

  @Input() display!: string;

  constructor(private user: UserAuthService, private router: Router, private categories: CategoryService, private wish: WishService, private cart: CartService, private guest: GuestService) { }
  toggle: boolean | string = false;

  isAuth: boolean = false;
  category: any[] = [];
  noOfWish: number = 0;
  noOfCart: number = 0;

  ngOnInit() {
    this.isAuth = this.user.isAuthenticated();


    this.cart.NoOFCartItem.subscribe(value => this.noOfCart = value);
    this.wish.noOfWish.subscribe(value => this.noOfWish = value);
    this.categories.getCategory().subscribe((category: any) => { this.category = category });
    if (this.isAuth) {

      this.cart.CheckItems();

      this.wish.checkWish();
    } else {
      this.cart.NoOFCartItem.next(this.guest.getCart().length);
      this.wish.noOfWish.next(this.guest.getWish().length);
    }

  }

  navToCate(id: any) {
    this.toggle = false;
    this.router.navigateByUrl(`/shop?category=${id}`)
  }

  navToLogin() {
    this.toggle = false;

    this.router.navigate(['/login']);
  }

  navToProfile() {
    this.toggle = false;

    this.router.navigate(['/profile']);

  }

  navCart() {
    this.toggle = false;

    this.router.navigate(['/cart']);
  }

  navWish() {
    this.toggle = false;

    this.router.navigate(['/wish']);
  }

  nav() {
    this.toggle = false;

    this.router.navigate([''])
  }


  navShop() {
    this.toggle = false;

    this.router.navigate(['/shop']);
  }


}
