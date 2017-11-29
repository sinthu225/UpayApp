import { Component, OnInit } from '@angular/core';
import { Productservice } from '../products.service';
import { AuthService } from '../core/auth.service';

import { Observable } from 'rxjs/Observable';

import { CurrencyPipe } from '@angular/common';



@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  cartItems: Observable<any>;
  user;

  totalBasket: Observable<any>;

  constructor(public auth: AuthService, public _productService: Productservice) { }

  ngOnInit() {
    this.auth.user.subscribe(
      res => {
        if (res != null) {
          this.user = res.uid;
          this.cartItems = this._productService.getCartItems(this.user);

          this.totalBasket = this.cartItems.map(arr => {
            const totalbasket = arr.map(v => v.subTotal);
            return totalbasket.length ? totalbasket.reduce((total, val) => total + val) : 0
          })
        }
        else {
          this.user = null;
        }
      }

    );
  }

}
