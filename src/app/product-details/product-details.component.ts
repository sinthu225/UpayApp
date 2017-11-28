import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Productservice } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productservice: Productservice
  ) { }

  ngOnInit() {
    this.product = this._route.paramMap
    .switchMap((params: ParamMap) =>
      this._productservice.getSingleProduct(params.get('id')));
  }

}
