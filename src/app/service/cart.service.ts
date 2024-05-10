import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }


  // baseUrl = 'http://localhost:3000';
  baseUrl = 'https://replicagiftsbackend.onrender.com';

  NoOFCartItem = new BehaviorSubject<number>(0);

  CheckItems() {
    this.getCart().subscribe((data: any) => {
      this.NoOFCartItem.next(data.length);
    });
  }

  addToCart(id: any, quantity: any, frameId: any) {

    console.log(quantity)




    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };


    return this.http.post(this.baseUrl + "/api/carts/add-cart/" + id, { quantity, frameId }, _options)

  }




  addFrame(frameDeatails: any, gifts: any, id: any) {


    const formData = new FormData();

    formData.append('quantity', frameDeatails.quantity);
    formData.append('printType', frameDeatails.printType);
    formData.append('userImage', frameDeatails.userImage);
    if (frameDeatails.frame)
      formData.append('userImageModel', frameDeatails.frame, 'userImageModel.png');
    formData.append('size', frameDeatails.size);
    formData.append('product', id);


    formData.append('gifts', JSON.stringify(gifts));

    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.post(this.baseUrl + "/api/frame/add-frame", formData, _options)

  }

  getFrame(id: any) {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.get<any>(this.baseUrl + "/api/frame/get/" + id, _options)
  }
  frameData(id: any) {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.get<any>(this.baseUrl + "/api/frame/get-frame/" + id, _options)
  }

  getAllFrames() {
    const token: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.get<any>(this.baseUrl + "/api/frame/orders", _options)
  }

  getCart() {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.get(this.baseUrl + "/api/carts/get-cart/", _options)
  }

  remove(id: any) {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.delete(this.baseUrl + "/api/carts/remove-item/" + id, _options)
  }

  editQuantity(id: any, quantity: any) {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };

    return this.http.post(this.baseUrl + "/api/carts/edit-quantity/" + id, { quantity }, _options)

  }

  editgiftQty(f_id: any, quantity: number, gift_id: any) {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.put(this.baseUrl + "/api/frame/gift-quantity/" + f_id, { quantity, gift: gift_id }, _options)

  }

  deleteGift(f_id: any, gift_id: any) {
    const token: string | null = localStorage.getItem('user');
    let _options = { params: { frameId: f_id, giftId: gift_id }, headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete(this.baseUrl + "/api/frame/gift", _options)

  }

}
