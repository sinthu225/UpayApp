import { Component, OnInit, Input } from '@angular/core';
import { Productservice } from '../products.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-basket-info',
  templateUrl: './basket-info.component.html',
  styleUrls: ['./basket-info.component.scss']
})
export class BasketInfoComponent implements OnInit {

  @Input() CartItem;

  singleProduct;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(public _productService: Productservice) { }

  ngOnInit() {
 
  }

}
