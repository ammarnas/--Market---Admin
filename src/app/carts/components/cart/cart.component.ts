import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  carts: any[] = [];
  products: any[] = [];
  total: any = 0;
  form!:FormGroup;
  details: any;

  constructor(private cartService: CartsService,private build: FormBuilder ,private productService: ProductsService) {}

  ngOnInit(): void {
    this.form = this.build.group({
      start:[''],
      end:['']
    })
    this.getAllCarts();
  }

  getAllCarts() {
    this.cartService.getAllCarts().subscribe((res:any) => {
      this.carts =res;
    })
  }

  applyFilter() {
    let date = this.form.value;
    this.cartService.getAllCarts(date).subscribe((res:any) => {
      this.carts =res;
    })
  }

  deleteCart(id: number) {
    this.cartService.deleteCart(id).subscribe(res => {
      this.getAllCarts();
      alert("Cart Deleted Susseccfully")
    })
  }

  view(index:number) {
    this.products = []
    this.details = this.carts[index];
    for(let x in this.details.products) {
      this.productService.getProductById(this.details.products[x].productId).subscribe(res => {
        this.products.push({item: res , quantity:this.details.products[x].quantity})
      })
    }
    console.log(this.details)
  } 
}
