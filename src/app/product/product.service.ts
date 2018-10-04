import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[];
  baseUrl = 'http://localhost:3000/products/';
  headers = new HttpHeaders( {'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
      .pipe();
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + productId).pipe();
  }

  addNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product, {headers: this.headers}).pipe();
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + productId).pipe();
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + product.id, product, {headers: this.headers}).pipe();
  }
}
