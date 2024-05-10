import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { WishService } from '../service/wish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../partials/header/header.component';
import { UserAuthService } from '../service/user-auth.service';
import { GuestService } from '../service/guest.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-shope',
  standalone: true,
  imports: [StarRatingComponent, CommonModule, FormsModule, SpinnerComponent, HeaderComponent],
  templateUrl: './shope.component.html',
  styleUrl: './shope.component.css'
})

export class ShopeComponent implements OnDestroy {

  private scrollInterval: any;
  private scrollAmount = 200; // Adjust the scroll amount as needed

  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    // Check if the pressed key is the up or down arrow key
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      // Prevent default behavior to avoid page scrolling
      event.preventDefault();

      // Start scrolling
      if (!this.scrollInterval) {
        this.scrollInterval = setInterval(() => {
          window.scrollBy(0, event.key === 'ArrowUp' ? -this.scrollAmount : this.scrollAmount);
        }, 150); // Adjust the interval as needed
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    // Check if the released key is the up or down arrow key
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      // Stop scrolling
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }

  constructor(
    private categoryService: CategoryService,
    private product: ProductService,
    private guest: GuestService,
    private router: Router,
    private route: ActivatedRoute,
    private wish: WishService,
    private user: UserAuthService
  ) { }

  @ViewChild('targetElement') targetElement!: ElementRef<HTMLElement>;

  setFocus() {
    this.targetElement.nativeElement.focus();
  }





  isAuth = this.user.isAuthenticated();

  subscribetion: any[] = [];

  count: number = 0;

  searchMenu: any[] = [];

  searchText: any;

  spinner: boolean = false;

  wishlist: any[] = [];

  selectedFilters: any = {
    search: '',
    page: 1,
    sort: "noOfPerchases",
    order: -1,
  };

  categories: any[] = [];
  ranges: number[] = [];
  discounts: { min: number, max: number }[] = [{ min: 10, max: 20 }, { min: 20, max: 30 }, { min: 30, max: 40 }, { min: 40, max: 100 }];
  products: any[] = [];
  selectedSort: number = 0;

  sort = [{ name: "Popularity", order: -1, q: "noOfPerchases" }, { name: "What's new", order: -1, q: "createdAt" }, { name: "Price: low to high", order: 1, q: "amount" }, { name: "Price: high to low", order: -1, q: "amount" }, { name: "A to Z", order: 1, q: "title" }, { name: "Z to A", order: -1, q: "title" }, { name: "Customer Rating", order: -1, q: "totalrating" }]

  private filterSubject = new BehaviorSubject<any>(this.selectedFilters);

  check = false;
  pageNo: any[] = [];
  ngOnInit(): void {

    this.spinner = true;
    window.scrollTo({ top: 0, behavior: "instant" })
    // Subscribe to filter changes and debounce the input
    this.subscribetion.push(this.filterSubject.pipe(

      debounceTime(300) // Debounce input to avoid rapid API requests

    ).subscribe((filters: any) => {
      this.spinner = true;

      this.setFocus()
      this.getFilteredProduct(filters);
    }))

    this.subscribetion.push(this.route.queryParams.subscribe(params => {
      let id = params['category'];

      if (id) {

        this.check = id;
        this.filterCategory(id);
      }
    }));

    this.loadInitialData();

    this.subscribetion.push(this.product.priceRange().subscribe((price: any) => {
      if (price.success) {
        this.ranges = price.ranges;
        // Update discounts array based on fetched data
      }
    }));

    this.subscribetion.push(this.categoryService.getCategory().subscribe((category: any) => this.categories = category));
    this.getWish();
  }




  filterCategory(category: any) {
    if (category) {

      this.selectedFilters.category = category;
    }
    this.selectedFilters.page = 1;


    this.filterSubject.next(this.selectedFilters); // Trigger filter update
  }

  applyPriceRange(e: any, minPrice: number, maxPrice: number) {
    if (e.target.checked) {
      this.selectedFilters.min = minPrice;
      this.selectedFilters.max = maxPrice;
    } else {
      this.selectedFilters.min = '';
      this.selectedFilters.max = '';
    }
    this.selectedFilters.page = 1;

    this.filterSubject.next(this.selectedFilters); // Trigger filter update
  }

  // applyDiscount(e: any, min: number, max: number) {
  //   if (e.target.checked) {
  //     this.selectedFilters.discountMin = min;
  //     this.selectedFilters.discountMax = max;
  //   } else {
  //     this.selectedFilters.discount = '';
  //   }
  //   this.selectedFilters.page = 1;

  //   this.filterSubject.next(this.selectedFilters); // Trigger filter update
  // }


  applyDiscount(e: any, min: number | null, max: number | null) {
    if (e.target.checked) {
      if (min !== null && max !== null) {
        this.selectedFilters.discountMin = min;
        this.selectedFilters.discountMax = max;
      } else {
        // Handle no discount case
        // For example, reset the applied discount
        this.selectedFilters.discountMin = null;
        this.selectedFilters.discountMax = null;
        this.selectedFilters.discount = 'No Discount';
      }
    } else {
      this.selectedFilters.discount = '';
    }

    this.selectedFilters.page = 1;

    this.filterSubject.next(this.selectedFilters); // Trigger filter update
  }



  applyRating(e: any, rating: number) {
    if (e.target.checked) {
      this.selectedFilters.rating = rating;

    } else {
      this.selectedFilters.rating = '';
    }
    this.filterSubject.next(this.selectedFilters); // Trigger filter update
  }
  applySearch() {
    this.filterSubject.next(this.selectedFilters); // Trigger filter update
  }
  applySort(sort: any) {
    this.selectedSort = sort
    this.selectedFilters.sort = this.sort[sort].q;
    this.selectedFilters.order = this.sort[sort].order;

    this.filterSubject.next(this.selectedFilters); // Trigger filter update
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

  loadInitialData() {
    // Load initial data when the component initializes
    this.getFilteredProduct(this.selectedFilters);
  }


  getWish() {
    if (this.isAuth) {
      this.wish.getWishList().subscribe((wishList: any) => {
        this.wishlist = wishList.map((wish: any) => wish._id);
      })
    } else {
      this.wishlist = this.guest.getWish().map((wish: any) => wish._id);
    }
  }



  nav(id: any) {

    this.router.navigateByUrl(`/product/${id}`)
  }

  getVisiblePageNumbers(): number[] {
    const currentPage = this.selectedFilters.page;
    const totalPages = this.pageNo.length;
    const visiblePages: number[] = [];

    // Add the selected page
    if (currentPage !== 1 && currentPage !== 10) {

      visiblePages.push(currentPage);
    }

    // Add adjacent pages around the selected page
    let leftPage = currentPage - 1;
    let rightPage = currentPage + 1;

    // If selected page is not the first page, add adjacent pages on the left
    while (leftPage > 1 && visiblePages.length < 3) {
      visiblePages.unshift(leftPage);
      leftPage--;
    }

    // If selected page is not the last page, add adjacent pages on the right
    while (rightPage < totalPages && visiblePages.length < 5) {
      visiblePages.push(rightPage);
      rightPage++;
    }

    return visiblePages;
  }

  addWish(id: any) {
    if (this.isAuth)
      this.subscribetion.push(this.wish.addWish(id._id).subscribe((wish: any) => { console.log(wish); this.wish.checkWish(); this.getWish() }));
    else {

      this.guest.addToWish(id)
      this.wish.noOfWish.next(this.guest.getWish().length)
      this.getWish()
    }

    if (id.like) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item Added to Wishlist",
        showConfirmButton: false,
        timer: 1000
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item Removed from Wishlist",
        showConfirmButton: false,
        timer: 1000
      });
    }

  }



  getFilteredProduct(selected: any) {
    this.subscribetion.push(this.product.limitedProduct(selected).subscribe((products: any) => {
      this.products = products.product;
      this.pageNo = [];
      for (let i = 0; i < products.total; i++) {
        this.pageNo[i] = i + 1;
      }

      console.log(this.products);
      this.spinner = false;
      this.count = products.count;
    }));
  }



  ngOnDestroy() {
    this.subscribetion.forEach((s) => {
      s.unsubscribe();
    })
  }




}