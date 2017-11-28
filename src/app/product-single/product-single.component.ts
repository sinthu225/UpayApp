import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core/auth.service';
import { Ratingservice } from '../star.service';
import { Productservice } from '../products.service';

import { DecimalPipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {

  @Input() UID;
  @Input() PID;
  @Input() Single_Product;

  stars: Observable<any>;
  avgRating: Observable<any>;

  showSpinner: boolean = false;

 
  constructor(
    private afs: AngularFirestore, 
    public auth: AuthService,
    private _ratingService: Ratingservice,
    public _productService: Productservice
  ) { }

  ngOnInit() {
    this.stars = this._ratingService.getProductRatings(this.productId)
    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 0
    })

    
  }

  get productId() {
    return this.Single_Product.id;
  }
  get userId() {
    return this.UID;
  }

  addToCartHandler(value) {
    this.showSpinner = true;
    this._productService.addToCart(value, 1, this.Single_Product.title, this.Single_Product.price, this.UID)
  }

}
