import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  cartProducts: any = [];
  total: any = 0;
  success: boolean = false

  constructor(private cartService: CartsService) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getCartTotal();
  }

  getCartTotal() {
    this.total = 0;
    for(let i in this.cartProducts) {
      this.total += this.cartProducts[i].item.price * this.cartProducts[i].quantity;
    }
  }

  minsAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }

  plusAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }

  detectChange() {
    this.getCartTotal();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index , 1);
    this.getCartTotal();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }

  clearCart() {
    this.cartProducts = [];
    this.getCartTotal();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }

  addCart() {
    let products = this.cartProducts.map((product: any) => {
      return {productId: product.item.id , quantity: product.quantity}
    })

    let Model = {
      userId: 5,
      date: new Date(),
      products: products
    }

    this.cartService.CreateNewCart(Model).subscribe(res => {
      this.success = true;
    })
    console.log(Model)
  }
}
