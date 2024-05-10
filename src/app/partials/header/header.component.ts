import { Component, SimpleChanges } from '@angular/core';
import { UserAuthService } from '../../service/user-auth.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { CommonModule } from '@angular/common';
import { WishService } from '../../service/wish.service'
import { CartService } from '../../service/cart.service'
import { ProductService } from '../../service/product.service';
import { FormsModule } from '@angular/forms';
import { routes } from '../../app.routes';
import { GuestService } from '../../service/guest.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private user: UserAuthService,
    private router: Router,
    private categories: CategoryService,
    private wish: WishService,
    private cart: CartService,
    private product: ProductService,
    private guest: GuestService,
    private route: ActivatedRoute) { }

  show: boolean = false;

  isAuth: boolean = false;
  category: any[] = [];
  noOfWish: number = 0;
  noOfCart: number = 0;

  toggle: boolean | string = false;

  searchMenu: any[] = [];

  searchText: any;
  username: any;
  profilePic: any;

  display: any = '';

  ngOnInit() {
    this.isAuth = this.user.isAuthenticated();


    this.cart.NoOFCartItem.subscribe(value => this.noOfCart = value);
    this.wish.noOfWish.subscribe(value => this.noOfWish = value);
    this.categories.getCategory().subscribe((category: any) => { this.category = category });
    if (this.isAuth) {
      this.user.getUser().subscribe((user: any) => {
        this.username = user.username;
        console.log(user)
        this.profilePic = user.profile;
      })

      this.cart.CheckItems();

      this.wish.checkWish();
    } else {
      this.cart.NoOFCartItem.next(this.guest.getCart().length);
      this.wish.noOfWish.next(this.guest.getWish().length);
    }



  }


  ngOnChanges(changes: SimpleChanges) {

  }

  navToCate(id: any) {
    this.router.navigateByUrl(`/shop?category=${id}`)
  }

  navToLogin() {
    this.router.navigate(['/login']);
  }

  navToProfile() {
    this.router.navigate(['/profile']);

  }

  navCart() {
    this.router.navigate(['/cart']);
  }

  navWish() {
    this.router.navigate(['/wish']);
  }

  nav() {
    this.router.navigate([''])
  }


  navShop() {
    this.router.navigate(['/shop']);
  }

  navtoproduct() {
    console.log();
    let id = this.searchMenu.find(f => f.title === this.searchText);
    this.router.navigateByUrl(`/product/${id._id}`)
  }


  search() {
    this.product.limitedProduct({ search: this.searchText, limit: 10 }).subscribe((data: any) => {
      console.log(data.product)
      this.searchMenu = data.product;
    });
  }



}
