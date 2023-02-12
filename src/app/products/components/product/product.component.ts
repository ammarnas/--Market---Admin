import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/IProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() data!: IProduct;
  @Output() item = new EventEmitter();
  addButton: boolean = false;
  amount: any = 0;


  add() {
    this.item.emit({item: this.data , quantity: this.amount});
  }
}
