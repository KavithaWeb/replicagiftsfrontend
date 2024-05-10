import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  // baseUrl = 'http://localhost:3000';
  baseUrl = 'https://replicagiftsbackend.onrender.com';
  constructor(private http: HttpClient, private cart: CartService) {
    this.initData('cart');
    this.initData('wish');
    this.initUser()
  }

  private initUser(): string | null {
    if (!localStorage.getItem('id')) {
      localStorage.setItem('id', self.crypto.randomUUID())
    }

    return localStorage.getItem('id');
  }

  private initData(key: string): void {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  }

  private setData(data: any, key: string): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getData(key: string): any {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  }

  addToCart(frameDeatails: any, product: any, gifts: any): boolean {
    try {
      const cart = this.getData('cart');

      if (!gifts) {
        console.log(gifts, "fdghf");
      }
      console.log(gifts);
      const formData = new FormData();

      formData.append('quantity', frameDeatails.quantity);
      formData.append('printType', frameDeatails.printType);
      formData.append('userImage', frameDeatails.userImage);
      formData.append('size', frameDeatails.size);
      if (frameDeatails.frame)

        formData.append('userImageModel', frameDeatails.frame, 'userImageModel.png');

      formData.append('product', product._id);
      formData.append('user', this.initUser() ?? '');
      formData.append('gifts', JSON.stringify(gifts));


      this.http.post(this.baseUrl + '/api/guest/add-frame', formData).subscribe((frame: any) => {


        const newItem = { _id: self.crypto.randomUUID(), productId: product, quantity: +frameDeatails.quantity, userWant: frame, total: +frameDeatails.quantity * +product.amount };
        cart.push(newItem);
        this.setData(cart, 'cart');
        this.cart.NoOFCartItem.next(cart.length);

      })
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  }

  buyNow(frameDeatails: any, product: any, gifts: any) {

    const formData = new FormData();

    formData.append('quantity', frameDeatails.quantity);
    formData.append('printType', frameDeatails.printType);
    formData.append('userImage', frameDeatails.userImage);
    formData.append('size', frameDeatails.size);
    formData.append('product', product._id);
    if (frameDeatails.frame)

      formData.append('userImageModel', frameDeatails.frame, 'userImageModel.png');

    formData.append('gifts', JSON.stringify(gifts));
    formData.append('user', this.initUser() ?? '');


    return this.http.post(this.baseUrl + '/api/guest/add-frame', formData);
  }

  getCart(): any {
    return this.getData('cart');
  }

  deleteCartItem(id: any): boolean {
    try {
      let cart = this.getCart();
      let frame;
      cart = cart.filter((item: any) => {
        if (item._id !== id) {
          return true
        } else {
          frame = item.userWant._id;
          return false
        }
      });
      this.setData(cart, 'cart');
      if (frame) {

        this.http.delete(this.baseUrl + '/api/guest/remove/' + frame).subscribe(data => {
          console.log(data)
        })

      }

      return true;
    } catch (error) {
      console.error('Error deleting cart item:', error);
      return false;
    }
  }


  editQuantity(id: any, quantity: any, frame_id: any) {
    this.http.put(this.baseUrl + '/api/guest/frame-quantity/' + frame_id, { quantity }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(async (data: any) => {
      console.log(data);

      let cart = this.getCart();
      cart = await Promise.all(cart.map((item: any) => {
        if (item._id === id) {
          item.quantity = data.frame.quantity;
          item.userWant = data.frame;
        }

        return item
      }));


      this.setData(cart, 'cart');
    })

  }



  addToWish(product: any): boolean {
    try {
      let wish = this.getData('wish');

      const index = wish.findIndex((w: any) => w._id === product._id);
      if (index !== -1) {
        // Product already exists in the wishlist, remove it
        wish.splice(index, 1);
      } else {
        // Product does not exist in the wishlist, add it
        const newItem = { ...product };
        wish.push(newItem);
      }
      this.setData(wish, 'wish');
      return true;
    } catch (error) {
      console.error('Error adding to wish list:', error);
      return false;
    }
  }



  getWish(): any {
    return this.getData('wish');
  }

  deleteWishItem(id: any): boolean {
    try {
      let wish = this.getWish();
      wish = wish.filter((item: any) => item._id !== id);
      this.setData(wish, 'wish');
      return true;
    } catch (error) {
      console.error('Error deleting wish list item:', error);
      return false;
    }
  }


  checkout(product: any) {
    return this.http.post(this.baseUrl + '/api/guest/createOrder', { user: this.initUser(), ...product }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  verify(orderId: any, paymentId: any, signature: any, frameIds: any) {
    return this.http.post<any>(this.baseUrl + '/api/guest/verifyPayment', { frameIds, orderId, paymentId, signature, user: this.initUser() }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });

  }


  orders() {
    return this.http.get<any>(this.baseUrl + '/api/guest/orders/' + this.initUser())
  }

  async updateUserWant(frame: any, id: any) {
    let cart = this.getCart();

    const updatedCart = await Promise.all(cart.map(async (car: any) => {
      if (car._id.toString() === id.toString()) {
        car.userWant = frame;
        return car;
      } else {
        return car;

      }
    }));
    this.setData(updatedCart, 'cart');

  }

}



