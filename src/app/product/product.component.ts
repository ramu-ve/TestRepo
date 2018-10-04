import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './product.model';
import { ProductService } from '../product/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  isAdded = false;
  product: Product;
  productId: number;
  pageTitle = 'Add New Product';
  btnTitle = 'Add Product';
  confirmationMessage = 'New Product has been added successfully';
  constructor(private http: HttpClient, private _router: Router, private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
    console.log('Constructor called');
  }
  productObj: object = {};
  ngOnInit() {
    console.log('NgOnIt called');
    this.activatedRoute.paramMap.subscribe(p => {
      this.productId = +p.get('id');
      this.getProductById(this.productId);
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  }

  addNewProduct(product: Product) {
   this.productService.addNewProduct(product).subscribe(
      p => {
        this.isAdded = true;
        this.confirmationMessage = 'New Product has been added successfully';
        this._router.navigate(['/']);
      });

  }

  getProductById(productId: number) {
    if (this.productId === 0) {
      this.pageTitle = 'Add New Product';
      this.btnTitle ='Add Product';
      this.product = { id: 0, name: null, color: null };
    } else {
      this.pageTitle = 'Edit Product';
      this.btnTitle ='Update Product';
      this.productService.getProductById(productId).subscribe((p: Product) => {
        this.product = p;
      });
    }
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe(
      (product: Product) => {
        console.log('Product details has been updated for ProductId ' + product.id);
      }
    );
    this._router.navigate(['/']);
  }
}
