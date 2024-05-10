

/*=============== IMAGE GALLERY ===============*/

function imgGallery() {
  const mainImg = document.querySelector(".details__img"),
    smallImg = document.querySelectorAll(".details__small-img");
  smallImg.forEach((img) => {
    img.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  });
}

imgGallery();


/=============== IMAGE GALLERY ===============/

function imgGallery() {
  const mainImg = document.querySelector(".details__img"),
    smallImg = document.querySelectorAll(".details__small-img");
  smallImg.forEach((img) => {
    img.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  });
}

imgGallery();



function categoryContainer() {

  /=============== SWIPER CATEGORIES ===============/
  let swiperCategories = new Swiper(".categories__container", {
    spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      delay: 5000, // Delay in milliseconds between slides
      disableOnInteraction: false, // Prevent autoplay interruption on interaction
    },

    breakpoints: {
      350: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
      1400: {
        slidesPerView: 6,
        spaceBetween: 24,
      },
    },
  });
}

function productContainer() {

  /=============== SWIPER PRODUCTS ===============/
  let swiperProducts = new Swiper(".new__container", {
    spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      delay: 5000, // Delay in milliseconds between slides
      disableOnInteraction: false, // Prevent autoplay interruption on interaction
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
  });
}

// /=============== PRODUCTS TABS ===============/
// const tabs = document.querySelectorAll("[data-target]"),
//   tabsContents = document.querySelectorAll("[content]");

// tabs.forEach((tab) => {
//   tab.addEventListener("click", () => {
//     const target = document.querySelector(tab.dataset.target);

//     tabsContents.forEach((tabsContent) => {
//       tabsContent.classList.remove("active-tab");
//     });

//     target.classList.add("active-tab");

//     tabs.forEach((tab) => {
//       tab.classList.remove("active-tab");
//     });

//     tab.classList.add("active-tab");
//   });
// });



document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });



  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate pURE cOUNTER
   */

  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */



  
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });






  /**
   * Animation on scroll function and init
   */
  // function aos_init() {
  //   AOS.init({
  //     duration: 1000,
  //     easing: 'ease-in-out',
  //     once: true,
  //     mirror: false
  //   });
  // }
  // window.addEventListener('load', () => {
  //   aos_init();
  // });

});



document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('quickViewModal');
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');
  const closeBtn = document.querySelector('.close');

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      modal.style.display = 'block';
    });
  });

  try {
    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  } catch (e) {
    console.log(e);
  }

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});



window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 4500 || document.documentElement.scrollTop > 4500) {
    document.querySelector('.scroll-top-btn').classList.add('show');
  } else {
    document.querySelector('.scroll-top-btn').classList.remove('show');
  }
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// function productContainer() {

//   /*=============== SWIPER CATEGORIES ===============*/
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

//   /*=============== SWIPER PRODUCTS ===============*/
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

//   /*=============== PRODUCTS TABS ===============*/
//   const tabs = document.querySelectorAll("[data-target]"),
//     tabsContents = document.querySelectorAll("[content]");

//   tabs.forEach((tab) => {
//     tab.addEventListener("click", () => {
//       const target = document.querySelector(tab.dataset.target);

//       tabsContents.forEach((tabsContent) => {
//         tabsContent.classList.remove("active-tab");
//       });

//       target.classList.add("active-tab");

//       tabs.forEach((tab) => {
//         tab.classList.remove("active-tab");
//       });

//       tab.classList.add("active-tab");
//     });
//   });

// }

// document.addEventListener('DOMContentLoaded', () => {
//   "use strict";

//   /**
//    * Preloader
//    */
//   const preloader = document.querySelector('#preloader');
//   if (preloader) {
//     window.addEventListener('load', () => {
//       preloader.remove();
//     });
//   }

//   /**
//    * Sticky header on scroll
//    */
//   const selectHeader = document.querySelector('#header');
//   if (selectHeader) {
//     document.addEventListener('scroll', () => {
//       window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
//     });
//   }

//   /**
//    * Scroll top button
//    */
//   const scrollTop = document.querySelector('.scroll-top');
//   if (scrollTop) {
//     const togglescrollTop = function () {
//       window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
//     }
//     window.addEventListener('load', togglescrollTop);
//     document.addEventListener('scroll', togglescrollTop);
//     scrollTop.addEventListener('click', window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     }));
//   }

//   /**
//    * Mobile nav toggle
//    */
//   const mobileNavShow = document.querySelector('.mobile-nav-show');
//   const mobileNavHide = document.querySelector('.mobile-nav-hide');

//   document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
//     el.addEventListener('click', function (event) {
//       event.preventDefault();
//       mobileNavToogle();
//     })
//   });

//   function mobileNavToogle() {
//     document.querySelector('body').classList.toggle('mobile-nav-active');
//     mobileNavShow.classList.toggle('d-none');
//     mobileNavHide.classList.toggle('d-none');
//   }

//   /**
//    * Hide mobile nav on same-page/hash links
//    */
//   document.querySelectorAll('#navbar a').forEach(navbarlink => {

//     if (!navbarlink.hash) return;

//     let section = document.querySelector(navbarlink.hash);
//     if (!section) return;

//     navbarlink.addEventListener('click', () => {
//       if (document.querySelector('.mobile-nav-active')) {
//         mobileNavToogle();
//       }
//     });

//   });

//   /**
//    * Toggle mobile nav dropdowns
//    */
//   const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

//   navDropdowns.forEach(el => {
//     el.addEventListener('click', function (event) {
//       if (document.querySelector('.mobile-nav-active')) {
//         event.preventDefault();
//         this.classList.toggle('active');
//         this.nextElementSibling.classList.toggle('dropdown-active');

//         let dropDownIndicator = this.querySelector('.dropdown-indicator');
//         dropDownIndicator.classList.toggle('bi-chevron-up');
//         dropDownIndicator.classList.toggle('bi-chevron-down');
//       }
//     })
//   });

//   /**
//    * Initiate pURE cOUNTER
//    */

//   // new PureCounter();


//   // const glightbox = GLightbox({
//   //   selector: '.glightbox'
//   // });

//   /**
//    * Init swiper slider with 1 slide at once in desktop view
//    */
//   new Swiper('.slides-1', {
//     speed: 600,
//     loop: true,
//     autoplay: {
//       delay: 5000,
//       disableOnInteraction: false
//     },
//     slidesPerView: 'auto',
//     pagination: {
//       el: '.swiper-pagination',
//       type: 'bullets',
//       clickable: true
//     },
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },


//   });







// });



// document.addEventListener('DOMContentLoaded', function () {
//   const modal = document.getElementById('quickViewModal');
//   const quickViewBtns = document.querySelectorAll('.quick-view-btn');
//   const closeBtn = document.querySelector('.close');

//   quickViewBtns.forEach(btn => {
//     btn.addEventListener('click', function () {
//       modal.style.display = 'block';
//     });
//   });

//   try {
//     closeBtn.addEventListener('click', function () {
//       modal.style.display = 'none';
//     });
//   } catch (e) {
//     console.log(e);
//   }

//   window.addEventListener('click', function (event) {
//     if (event.target === modal) {
//       modal.style.display = 'none';
//     }
//   });
// });



// window.onscroll = function () { scrollFunction() };

// function scrollFunction() {
//   if (document.body.scrollTop > 4500 || document.documentElement.scrollTop > 4500) {
//     document.querySelector('.scroll-top-btn').classList.add('show');
//   } else {
//     document.querySelector('.scroll-top-btn').classList.remove('show');
//   }
// }

// function scrollToTop() {
//   document.body.scrollTop = 0; // For Safari
//   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
// }


