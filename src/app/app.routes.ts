import { Routes } from '@angular/router';


import { ProductListComponent } from './product-list/product-list.component';


export const routes: Routes = [


    { path: '', component: ProductListComponent },
    {
        path: 'product/:id', loadComponent: () => import('./product-details/product-details.component')
            .then(c => c.ProductDetailsComponent)
    },
    {
        path: 'login', loadComponent: () => import('./login/login.component')
            .then(c => c.LoginComponent)
    },
    {
        path: 'cart', loadComponent: () => import('./shopping-cart/shopping-cart.component')
            .then(c => c.ShoppingCartComponent)
    },
    {
        path: 'register', loadComponent: () => import('./register/register.component')
            .then(c => c.RegisterComponent)
    },
    {
        path: 'profile', loadComponent: () => import('./profile/profile.component')
            .then(c => c.ProfileComponent)
    },
    {
        path: 'wish', loadComponent: () => import('./wish-list/wish-list.component')
            .then(c => c.WishListComponent)
    },
    {
        path: 'shop', loadComponent: () => import('./shope/shope.component')
            .then(c => c.ShopeComponent)
    },
    {
        path: 'buy-now/:id', loadComponent: () => import('./delevery-details/delevery-details.component')
            .then(c => c.DeleveryDetailsComponent)
    },
    {
        path: 'check-out', loadComponent: () => import('./delevery-details/delevery-details.component')
            .then(c => c.DeleveryDetailsComponent)
    },
    {
        path: 'order-view/:id', loadComponent: () => import('./order-view/order-view.component')
            .then(c => c.OrderViewComponent)
    },
    {
        path: 'terms', loadComponent: () => import('./tearms-and-condition/tearms-and-condition.component')
            .then(c => c.TearmsAndConditionComponent)
    },
    {
        path: 'frames', loadComponent: () => import('./frames/frames.component')
            .then(c => c.FramesComponent)
    },
    {
        path: 'privacy-policy', loadComponent: () => import('./privacy-paclicy/privacy-paclicy.component')
            .then(c => c.PrivacyPaclicyComponent)
    },
    {
        path: 'forgot-password', loadComponent: () => import('./forgot-password/forgot-password.component')
            .then(c => c.ForgotPasswordComponent)
    },

];
