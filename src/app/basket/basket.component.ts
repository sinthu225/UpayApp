import { Component, OnInit } from '@angular/core';
import { Productservice } from '../products.service';
import { AuthService } from '../core/auth.service';









@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {



  cartItems;
  user;






  constructor(public auth: AuthService, public _productService: Productservice) { }

  ngOnInit() {
    this.auth.user.subscribe(
      res => {
        if (res != null) {
          this.user = res.uid;
          this.cartItems = this._productService.getCartItems(this.user);
        }
        else {
          this.user = null;
        }
      }

    );

  }

}
