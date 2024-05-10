import { Component } from '@angular/core';
import { WishService } from '../service/wish.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserAuthService } from '../service/user-auth.service';
import { GuestService } from '../service/guest.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SpinnerComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {

  constructor(public wish: WishService, private router: Router, private user: UserAuthService, private guest: GuestService) { }

  isAuth = this.user.isAuthenticated();

  wishList: any[] = [];

  showContent = false


  ngOnInit() {
    window.scrollTo({ top: 0, behavior: "instant" })

    this.get()
  }

  get() {
    if (this.isAuth) {

      this.wish.getWishList().subscribe((wishList: any) => {
        console.log(wishList);
        this.showContent = true;

        this.wishList = wishList;
        this.wish.noOfWish.next(wishList.length);
      });
    } else {
      this.wishList = this.guest.getWish();
      this.showContent = true;
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


  navToProduct(id: any) {
    this.router.navigateByUrl(`/product?id=${id}`)
  }

  home() {
    this.router.navigate(['/'])
  }

}
