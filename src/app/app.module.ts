import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import {ProductService} from './product/product.service';
import {ProductResolverService} from './product/product-resolver.service';
import {ProductInterceptorService} from './product/product-interceptor.service';

const appRoutes: Routes = [
      {path: '', component: HomeComponent, resolve: {resolvedProducts: ProductResolverService}},
      {path: 'product', component: ProductComponent},
      {path: 'product/:id', component: ProductComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService,
  {provide: HTTP_INTERCEPTORS, useClass: ProductInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
