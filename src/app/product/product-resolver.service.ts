import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Product} from './product.model';
import {ProductService} from './product.service';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ProductResolverService implements Resolve<Product[] | string> {

  constructor(private prodService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[] | string> {
      return this.prodService.getProducts().pipe(
       catchError((err: string) => of(err))
      );
  }
}
