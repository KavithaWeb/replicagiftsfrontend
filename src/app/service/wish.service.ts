import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishService {
  constructor(private http: HttpClient) { }

  noOfWish = new BehaviorSubject<number>(0);


  checkWish() {
    this.getWishList().subscribe((wish: any) => { this.noOfWish.next(wish.length) })
  }

  getWishList() {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.get('https://replicagiftsbackend.onrender.com/api/wishlist/wish', _options);
  }

  removeWish(id: any) {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.delete('https://replicagiftsbackend.onrender.com/api/wishlist/remove-wish/' + id, _options);

  }

  addWish(id: any) {
    const token: string | null = localStorage.getItem('user');
    console.log(token)
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('https://replicagiftsbackend.onrender.com/api/wishlist/add-wish', { id }, _options);

  }

}
