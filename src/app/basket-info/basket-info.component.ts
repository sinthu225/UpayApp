import { Component, OnInit, Input } from '@angular/core';
import { Productservice } from '../products.service';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs/Observable';

import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-basket-info',
  templateUrl: './basket-info.component.html',
  styleUrls: ['./basket-info.component.scss']
})
export class BasketInfoComponent implements OnInit {

  @Input() CartItem;

  singleProduct;
  product_ID;
  user ;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(public _productService: Productservice, public auth: AuthService) { }

  ngOnInit() {

    this.auth.user.subscribe(
      res => 
      {
        if(res != null)
        {
          this.user = res.uid
        }         
        else
        {
          this.user = null;
        }
      }                
    );

    this.product_ID = this.CartItem.productId;
    this._productService.getSingleProduct(this.product_ID).subscribe(
      res => this.singleProduct = res
     )
  }

  removeFromCartHandler() {
    this._productService.removeFromCart(this.product_ID, this.user, this.CartItem.qty );
  }



}
