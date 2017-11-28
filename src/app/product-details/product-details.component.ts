import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';


import { DecimalPipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

import { Productservice } from '../products.service';
import { Ratingservice } from '../star.service';
import { AuthService } from '../core/auth.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product
  product_ID;
  user ;
  showSpinner: boolean = false;

  stars: Observable<any>;
  avgRating: Observable<any>;

  subscription:Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productservice: Productservice,
    private auth: AuthService,
    private _ratingService: Ratingservice,
  ) { }

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
    

    


    this.product_ID = this._route.snapshot.queryParams['id'];     
    this._productservice.getSingleProduct(this.product_ID).subscribe(
      res => this.product = res
    )

    this.stars = this._ratingService.getProductRatings(this.product_ID)
    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 0
    })
  }

  addToCartHandler() {
    this.showSpinner = true;
    this._productservice.addToCart(this.product_ID, 1, this.product.title, this.product.price, this.user)
    this.showSpinner = false;
  }
  
}
