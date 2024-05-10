import { Component } from '@angular/core';
import { UserAuthService } from '../service/user-auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../service/cart.service';
import Swal from 'sweetalert2';
import { WishListComponent } from '../wish-list/wish-list.component';
import { WishService } from '../service/wish.service';
import { GuestService } from '../service/guest.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {

  constructor(private userService: UserAuthService, private profile: ProfileService, private auth: UserAuthService,
    private router: Router, private cart: CartService, private wish: WishService, private guest: GuestService) { }

  user: any = { username: '' }

  isAuth = this.userService.isAuthenticated();

  edit: boolean = false;

  display: any = "dashboard";

  err: any = false;
  emailerr: any = false;
  phnerr: any = false;
  posterr: any = false;

  changeDisplay(name: any) {
    this.display = name;
  }

  orders: any[] = [];
  address: any[] = [];

  billingDetails = {
    name: '',
    email: '',
    city: '',
    country: 'India',
    address: '',
    postcode: '',
    phone: '',
    state: ''
  }

  proPic: any;

  addPic(e: any) {
    this.proPic = e.target.files[0];
  }

  ngOnInit() {
    this.get()
    this.getCart()
    this.getw()
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  get() {
    this.edit = false
    if (this.isAuth) {
      this.userService.getUser().subscribe((user: any) => {
        this.orders = user.orders
        if (user.billingDetails) {

          this.billingDetails = user.billingDetails;
        } else {
          this.edit = true
        }

        this.user = user;
        this.getOrders()

      })
    } else {
      this.getOrders()
    }
  }

  validateNumber(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  isValidEmail(email: string): boolean {
    // Regular expression for validating email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|COM)$/;;

    return emailPattern.test(email);
  }


addAddress() {
    // Reset error messages
    this.phnerr = '';
    this.emailerr = '';
    this.posterr = '';

    if (this.billingDetails.name === '' || !this.isValidEmail(this.billingDetails.email) || this.billingDetails.address === '' || this.billingDetails.state === '' || this.billingDetails.country === '' || this.billingDetails.city === '' || this.billingDetails.phone.length < 10 || this.billingDetails.postcode.length < 6) {
      console.log('Please')
      this.err = "Please fill all required fields";
      // window.scrollTo({ top: 150, behavior: "smooth" })/

      // Check phone number
      if (this.billingDetails.phone.length < 10) {
        this.phnerr = "Enter a 10-digit phone number";
      }

      // Check email
      if (!this.isValidEmail(this.billingDetails.email)) {
        this.emailerr = "Please enter a valid email address";
      }

      // Check postcode
      if (this.billingDetails.postcode.length < 6) {
        this.posterr = "Please enter a valid 6-digit postcode";
      }

      return;

    } else {

      console.log(this.proPic);
      this.profile.addAddress(this.billingDetails, this.proPic).subscribe(
        (response: any) => {
          this.edit = false;
          console.log(response);
          this.user.billingDetails = response;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  nav(id: any) {
    this.router.navigateByUrl(`/buy-now/${id}`);
  }

  getOrders() {
    if (this.isAuth) {
      this.profile.getOrder().subscribe((response: any) => {
        this.orders = response;
        console.log(response);
      });
    } else {
      this.guest.orders().subscribe((response: any) => {
        this.orders = response;
      });
    }
  }

  logout() {
    this.auth.logOut();
    console.log("sd")
    this.router.navigate(['/']);

  }

  home() {
    this.router.navigate(['/']);
  }

  navtoorder(id: any) {
    this.router.navigateByUrl('/order-view/' + id)
  }

  updateQt(id: any, q: any, f_id: any) {
    if (this.isAuth) {

      this.cart.editQuantity(id, q).subscribe((wish: any) => { console.log(wish); this.getCart(true) });
    } else {
      this.guest.editQuantity(id, q, f_id)

      setTimeout(() => {
        this.getCart(true)
      }, 2000)

    }
  }
  cartList: any[] = [];
  total: number = 0;
  getCart(isDelet: boolean = false) {
    if (this.isAuth) {

      this.cart.getCart().subscribe((cart: any) => {
        this.cartList = cart;
        if (isDelet) {
          this.total = 0
        }
        this.cartList.map((cart) => {
          this.total = this.total + cart.userWant.totalAmount;
        })
        this.cart.NoOFCartItem.next(this.cartList.length);

      });
    } else {
      this.cart.NoOFCartItem.next(this.guest.getCart().length);

      if (isDelet) {
        this.total = 0
        console.log(this.total)
      }
      this.cartList = this.guest.getCart();
      this.cartList.map((cart) => {
        this.total = this.total + cart.userWant.totalAmount;
      })
    }
  }
  remove(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.isAuth) {
          this.cart.remove(id).subscribe((wish: any) => {
            console.log(wish);
            this.getCart(true)
            Swal.fire({
              title: "Deleted!",
              text: "Your cart item has been deleted.",
              icon: "success"
            });
          });
        } else {
          this.guest.deleteCartItem(id) ?
            Swal.fire({
              title: "Deleted!",
              text: "Your cart item has been deleted.",
              icon: "success"
            })
            : console.error("Cart item deleted");
          this.getCart(true)

        }
      }
    });
  }
  wishList: any[] = [];
  getw() {
    if (this.isAuth) {

      this.wish.getWishList().subscribe((wishList: any) => {
        console.log(wishList);
        this.wishList = wishList;
        this.wish.noOfWish.next(wishList.length);
      });
    } else {
      this.wishList = this.guest.getWish();
      this.wish.noOfWish.next(this.guest.getWish().length);

      console.log(this.wishList);
    }
  }
  removeWish(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.isAuth) {
          this.wish.removeWish(id).subscribe((wish: any) => {
            console.log(wish); this.get();
            Swal.fire({
              title: "Deleted!",
              text: "Your Wish item has been deleted.",
              icon: "success"
            });
          });
        } else {
          this.guest.deleteWishItem(id);
          this.get();
          this.wish.noOfWish.next(this.guest.getWish().length);
          Swal.fire({
            title: "Deleted!",
            text: "Your Wish item has been deleted.",
            icon: "success"
          });
        }
      }
    });
  }

  giftTotal(gifts: any): number {
    let total = 0;
    gifts.forEach((element: any) => {
      total += element.total;
    });

    return total
  }


  navToProduct(id: any) {
    this.router.navigateByUrl(`/product?id=${id}`)
  }

  // logout() {
  //   // Clear user session
  //   localStorage.removeItem('user');
  //   // Redirect to login page
  //   this.router.navigate(['/login']);
  // }


  updateGift(id: any, quantity: any, gift: any, _id: any): void {
    this.cart.editgiftQty(id, quantity, gift).subscribe((response: any) => {
      if (!this.isAuth) {
        this.guest.updateUserWant(response.frame, _id);
      }
      setTimeout(() => {
        this.getCart(true);

      }, 500)
    })
  }

  removeGift(f_id: any, g_id: any, _id: any) {
    this.cart.deleteGift(f_id, g_id).subscribe((response: any) => {
      if (!this.isAuth) {
        this.guest.updateUserWant(response.frame, _id);
      }
      setTimeout(() => {
        this.getCart(true);

      }, 500)
    })
  }

}
