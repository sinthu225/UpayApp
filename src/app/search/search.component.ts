import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchterm: string;
  
   startAt = new Subject();
   endAt = new Subject();
  
   products;
   allproducts;
  
   startobs = this.startAt.asObservable();
   endobs = this.endAt.asObservable();

  constructor(private afs: AngularFirestore) { }

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
    // else {
    //   this.products = this.allproducts;
    // }

    
  }

  firequery(start, end) {
    return this.afs.collection('products', ref => ref.limit(4).orderBy('title').startAt(start).endAt(end)).valueChanges();
  }
 
  getallproducts() {
    return this.afs.collection('products', ref => ref.orderBy('title')).valueChanges();
  }

}
