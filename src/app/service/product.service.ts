import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // baseUrl = 'https://replicagiftsbackend.onrender.com';
  baseUrl = 'https://replicagiftsbackend.onrender.com';
  constructor(private http: HttpClient) { }

  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  addProduct(data: any) {

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("userImage", data.userImage);
    formData.append("category", data.category);
    formData.append("discount", data.discount);
    formData.append("description", data.description);
    formData.append("additionalInfo", JSON.stringify(data.additionalInfo));
    formData.append("availablePrintSize", JSON.stringify(data.availablePrintSize));

    data.availablePrintType.forEach((d: any) => {

      formData.append("availablePrintType", d);
    })
    formData.append("quantity", data.quantity);
    formData.append("image", data.image)


    const admin: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${admin ? JSON.parse(admin).token : ""}` }) };


    return this.http.post(this.baseUrl + "/api/products/add-product", formData, _options)


  }


  get() {
    return this.http.get<Product[]>(this.baseUrl + "/api/products/all");
  }

  edit(data: any, id: any) {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("userImage", data.userImage);
    formData.append("discount", data.discount);
    formData.append("category", data.category);

    formData.append("description", data.description);
    formData.append("additionalInfo", JSON.stringify(data.additionalInfo));
    formData.append("availablePrintSize", JSON.stringify(data.availablePrintSize));

    data.availablePrintType.forEach((d: any) => {

      formData.append("availablePrintType", d);
    })
    formData.append("quantity", data.quantity);

    formData.append("image", data.image);





    const admin: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${admin ? JSON.parse(admin).token : ""}` }) };


    return this.http.put(this.baseUrl + "/api/products/update/" + id, formData, _options);

  }

  delete(id: any) {

    const admin: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${admin ? JSON.parse(admin).token : ""}` }) };



    return this.http.delete(this.baseUrl + "/api/products/delete/" + id, _options);

  }


  getTrending() {
    return this.http.get(this.baseUrl + "/api/products/trending-products");
  }
  getNew() {
    return this.http.get(this.baseUrl + "/api/products/new-arrivals");
  }

  getProduct(id: any) {
    return this.http.get<Product>(this.baseUrl + "/api/products/data/" + id);
  }


  getProductCategoryWise(id: any) {
    return this.http.get<Product[]>(this.baseUrl + "/api/products/category/" + id);
  }

  fetchOutOfStock() {


    const admin: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${admin ? JSON.parse(admin).token : ""}` }) };

    return this.http.get<Product[]>(this.baseUrl + "/api/products/out-of-stock", _options);

  }


  addreview(id: any, comment: any, rating: any) {


    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };

    return this.http.post(this.baseUrl + "/api/products/add-review/" + id, { comment, rating }, _options);

  }



  limitedProduct(query: any) {
    // Create a shallow copy of the query object


    // Make the HTTP request using the modified query object
    return this.http.get(this.baseUrl + "/api/products/filter", { params: query });
  }




  priceRange() {
    return this.http.get<any[]>(this.baseUrl + "/api/products/price-range");
  }

}
