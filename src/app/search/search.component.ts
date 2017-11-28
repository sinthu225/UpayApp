import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { CurrencyPipe } from '@angular/common';

import { Productservice } from '../products.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchterm: string;
  
   startAt = new Subject();
   endAt = new Subject();

   queryResults = new Subject();
  
   products;
   allproducts;
  
   startobs = this.startAt.asObservable();
   endobs = this.endAt.asObservable();

  constructor(private afs: AngularFirestore, public _productService: Productservice) { }

  ngOnInit() {

    this.getallproducts().subscribe((products) => {
      this.allproducts = products;
    })
    Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((products) => {
        this.products = products;
        
      })
    })
  }

  search($event) {
    let q = $event.target.value;
    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
  }

  firequery(start, end) {
    return this._productService.searchProducts(start, end);    
  }
 
  getallproducts() {
    return this.afs.collection('products', ref => ref.orderBy('title')).valueChanges();
  }

}
