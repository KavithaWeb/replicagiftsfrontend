import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


// // Define types if necessary
// interface Category {
//   _id: string;
//   categoryName: string;
//   thumbnail: string;
// }

// // Assume Swiper is imported or available globally
// declare var Swiper: any;

// // Function to navigate to a category
// function navToCategory(categoryId: string): void {
//   // Implement navigation logic here
//   console.log("Navigating to category with ID:", categoryId);
// }

// // Function to navigate to a product
// function nav(productId: string): void {
//   // Implement navigation logic here
//   console.log("Navigating to product with ID:", productId);
// }

// // Function to add a product to wishlist
// function addWish(productId: string): void {
//   // Implement wishlist addition logic here
//   console.log("Adding product to wishlist with ID:", productId);
// }

// // Main code
// document.addEventListener("DOMContentLoaded", function () {
//   // Attach click event to category items
//   const categoryItems = document.querySelectorAll('.category__item');
//   categoryItems.forEach(item => {
//     item.addEventListener('click', function (event) {
//       const categoryId = item.getAttribute('data-category-id');
//       if (categoryId) {
//         navToCategory(categoryId);
//       }
//     });
//   });

//   // Attach click event to product items container
//   const productItemsContainer = document.querySelector('.new__container');
//   productItemsContainer?.addEventListener('click', function (event) {
//     const target = (event.target as HTMLElement).closest('.product__item');
//     if (target) {
//       const productId = target.getAttribute('data-product-id');
//       if (productId) {
//         nav(productId);
//       }

//       const wishlistBtn = (event.target as HTMLElement).closest('.action__btn');
//       if (wishlistBtn) {
//         const productId = target.getAttribute('data-product-id');
//         if (productId) {
//           addWish(productId);
//         }
//       }
//     }
//   });

//   let swiperCategories = new Swiper(".categories__container", {
//     spaceBetween: 24,
//     loop: true,
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },

//     autoplay: {
//       delay: 5000, // Delay in milliseconds between slides
//       disableOnInteraction: false, // Prevent autoplay interruption on interaction
//     },

//     breakpoints: {
//       350: {
//         slidesPerView: 2,
//         spaceBetween: 24,
//       },
//       768: {
//         slidesPerView: 3,
//         spaceBetween: 24,
//       },
//       992: {
//         slidesPerView: 4,
//         spaceBetween: 24,
//       },
//       1200: {
//         slidesPerView: 5,
//         spaceBetween: 24,
//       },
//       1400: {
//         slidesPerView: 6,
//         spaceBetween: 24,
//       },
//     },
//   });

//   let swiperProducts = new Swiper(".new__container", {
//     spaceBetween: 24,
//     loop: true,
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },

//     autoplay: {
//       delay: 5000, // Delay in milliseconds between slides
//       disableOnInteraction: false, // Prevent autoplay interruption on interaction
//     },

//     breakpoints: {
//       768: {
//         slidesPerView: 2,
//         spaceBetween: 24,
//       },
//       992: {
//         slidesPerView: 4,
//         spaceBetween: 24,
//       },
//       1400: {
//         slidesPerView: 4,
//         spaceBetween: 24,
//       },
//     },
//   });
// });
