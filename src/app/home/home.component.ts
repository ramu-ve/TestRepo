import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product/product.service';
import { Product } from '../product/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] | string;
  product: Product;
  header = new HttpHeaders({'content-type': 'application/json'});

  constructor(private http: HttpClient, 
              private productService: ProductService,
              private route: ActivatedRoute) { }


  getProducts =  function () {
    console.log('getProducts called');
    this.productService.getProducts()
    .subscribe((products) => {
      this.products = products;
    });
  }

  ngOnInit() {
    console.log('ngOnit event is called');
    this.getProducts();
    //  let resolvedProducts : Product[] | string = this.route.snapshot.data['resolvedProducts'];

    //  if (resolvedProducts instanceof Object)    {
    //   this.products = resolvedProducts;
    // }    else    {
    //   console.log(resolvedProducts);
    // }
}

  deleteProduct(id: number) {
    console.log('Delete event is called');
    if (confirm('Are you sure want to delete this product?')) {
      const url = `${'http://localhost:3000/products'}/${id}`;
    return this.productService.deleteProduct(id).subscribe(() => {
      console.log(`Product Id:${id} has been deleted successfully`);
      this.getProducts();
    });
    }
  }

  getProductById(productId: number) {
    this.productService.getProductById(productId).subscribe(
      (product: Product) => {
        this.product = product;
      }
    );
  }
}
