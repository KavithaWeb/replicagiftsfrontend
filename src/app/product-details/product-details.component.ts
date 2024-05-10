import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../model/product.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { GiftsService } from '../service/gifts.service';
import { CategoryService } from '../service/category.service';
import { WishService } from '../service/wish.service';
import Swal from 'sweetalert2';
import { GuestService } from '../service/guest.service';
import { UserAuthService } from '../service/user-auth.service';
import { FramesComponent } from '../frames/frames.component';
import { SpinnerComponent } from '../spinner/spinner.component';


declare global {
  interface Window {
    imgGallery: () => void;
    productContainer: () => void;
    // Declare other functions here...
  }
}


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, StarRatingComponent, ReactiveFormsModule, FramesComponent, RouterLink, SpinnerComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private cart: CartService,
    private router: Router,
    private giftservice: GiftsService,
    private category: CategoryService,
    private wish: WishService,
    private guest: GuestService,
    private user: UserAuthService,
  ) { }
  private unsubscribe$: Subject<void> = new Subject<void>();
  productId: any;


  isAuth: boolean = this.user.isAuthenticated();


  comment = new FormControl('', Validators.required)

  relatedProduct: any[] = [];

  spinner: boolean = false;

  edit = false;
  save = false;

  gifts: any = [];

  selectedGifts: { gift: string, quantity: number, total: Number }[] = [];

  addGift(gift: any) {

    this.selectedGifts.push({ gift: gift._id, quantity: gift.selected_quantity, total: gift.price * gift.selected_quantity })
  }

  removeGift(gift: any) {
    let i = this.selectedGifts.findIndex(f => f.gift.toString() === gift._id.toString());
    this.selectedGifts.splice(i, 1);
    console.log(this.selectedGifts)
  }

  reset = false;

  data: Product = {
    title: '',
    description: '',
    price: 0,
    discount: 0,

    userImage: false,
    image: '',
    additionalInfo: [] as any,
    availablePrintSize: [] as any,
    availablePrintType: [],
    reviews: [] as any,
    category: '',
    frame: ''
  }

  img = false

  frameDeatails = {
    userImage: '',
    printType: '',
    size: '',
    quantity: 1,
    frame: '' as any
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: "instant" })
    this.spinner = true;

    this.route.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      this.productId = params['id'];
      console.log(this.productId);
      if (this.productId) {
        this.productService.getProduct(this.productId).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe((res: Product) => {
          this.spinner = false;

          this.data = res;
          this.frameDeatails = {
            userImage: '',
            printType: res.availablePrintType[0].categoryName,
            size: +res.availablePrintSize[0].width + ' x ' + +res.availablePrintSize[0].height + ' inche',
            quantity: 1,
            frame: '' as any

          }
          this.giftservice.getGifts().subscribe((items: any) => {
            this.gifts = items.map((item: any) => { item['selected_quantity'] = 1; return item });
            this.spinner = false;
            console.log(this.gifts)
          });

          this.category.getcategoryById(this.data.category._id).subscribe((category: any) => {
            this.spinner = false;
            this.relatedProduct = category;
          })
          console.log(this.data);
        });
      }
    });

    window.productContainer();
    window.imgGallery();
  }

  isGiftSelected(giftId: any): boolean {
    return this.selectedGifts.some(g => g.gift.toString() === giftId.toString());
  }

  buyNw = false;
  addCrt = false;

  active(btn: any) {
    if (this.frameDeatails.printType !== '' && this.frameDeatails.size !== '') {

      if (this.data.userImage) {
        console.log(this.data.userImage)
        if (this.frameDeatails.userImage === '') {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You forgot to upload your image",
            position: 'center',
          });
          return;
        }
      }
      if (btn === 'cart') {
        this.addCrt = true;
      } else {
        this.buyNw = true;
      }
      setTimeout(() => {
        window.productContainer();
        window.imgGallery();
      }, 100);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You forgot to upload your image",
        position: 'center',
      });
      return;
    }
  }

  addFile(e: any) {
    this.frameDeatails.userImage = e.target.files[0];
  }

  addCaputue(balb: any) {
    this.save = false;

    this.frameDeatails.frame = balb.file;
  }

  addCart(id: any) {
    this.save = true;
    if (this.frameDeatails.printType !== '' && this.frameDeatails.size !== '') {
      this.spinner = true;
      if (this.isAuth) {
        this.cart.addFrame(this.frameDeatails, this.selectedGifts, id).subscribe((dat: any) => {
          console.log(dat);
          this.cart.addToCart(id, this.frameDeatails.quantity, dat._id).subscribe(dat => {
            console.log(dat); this.cart.CheckItems();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Item Added to Cart",
              showConfirmButton: false,
              timer: 1500
            });
            this.spinner = false;
            this.addCrt = false;
            this.buyNw = false;
          });
          this.frameDeatails = {
            userImage: '',
            printType: '',
            size: '',
            quantity: 1,
            frame: '' as any

          };

          this.img = false;
        });
      } else {
        if (this.guest.addToCart(this.frameDeatails, this.data, this.selectedGifts)) {
          this.spinner = false;

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Item Added to Cart",
            showConfirmButton: false,
            timer: 1500
          });

          this.addCrt = false;
          this.buyNw = false;

          this.frameDeatails = {
            userImage: '',
            printType: '',
            size: '',
            frame: '' as any,

            quantity: 1,
          }
          this.img = false;


        } else {
          this.spinner = false;
          this.addCrt = false;
          this.buyNw = false;
          //   Swal.fire({
          //     icon: "error",
          //     title: "Oops...",
          //     text: "Fill the required fields",
          //   });

        }


      }
    } else {
      this.spinner = false;
      this.addCrt = false;
      this.buyNw = false;
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Fill the required fields",
      // });

    }
  }


  buyNow(id: any) {
    this.spinner = true;
    this.save = true;


    if (this.frameDeatails.printType !== '' && this.frameDeatails.size !== '') {

      if (this.isAuth) {
        this.cart.addFrame(this.frameDeatails, this.selectedGifts, id).subscribe((dat: any) => {
          this.spinner = false;
          console.log(dat);
          this.router.navigateByUrl(`/buy-now/${dat._id}`);
        });
      } else {
        this.guest.buyNow(this.frameDeatails, this.data, this.selectedGifts).subscribe((dat: any) => {
          this.spinner = false;

          this.router.navigateByUrl(`/buy-now/${dat._id}`);

        })
      }
    } else {
      this.spinner = false;
      this.addCrt = false;
      this.buyNw = false;
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Fill the required fields",
      // });
    }
  }


  addWish(id: any) {

    if (this.isAuth) {
      this.wish.addWish(id).subscribe((wish: any) => {
        console.log(wish);
      });
    } else {
      this.guest.addToWish(this.data);
      this.wish.noOfWish.next(this.guest.getWish().length);

    }

  }

}
