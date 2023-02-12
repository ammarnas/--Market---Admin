import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IProduct } from '../../models/IProduct';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {

  products: IProduct[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        alert('Error , Try again');
      }
    );
  }

  getCategories() {
    this.loading = true;
    this.productService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        alert('Error , Try again');
      }
    );
  }

  filterCategory(event: any) {
    let value = event.target.value;
    (value === 'all')  ? this.getProducts() : this.getProductsByCategory(value);
  }
  getProductsByCategory(keyword: string) {
    this.loading = true;
    this.productService.getProductsByCategory(keyword).subscribe((res: any) => {
      this.loading = false;
      this.products = res;
    });
  }

  addToCart(event: any) {
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exsit = this.cartProducts.find(item => item.item.id == event.item.id);
      if(exsit) {
        alert("Product is already in your cart")
      }else {
        this.cartProducts.push(event)
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
    }
  }
}
