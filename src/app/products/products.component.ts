import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';
import { Productservice } from '../products.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  user ;
  
  products;

  constructor(public auth: AuthService, public _productService: Productservice ) { 
    
  }

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
    this.products = this._productService.getProducts();
    
  }

  get UID() {
    return this.user;
  }

}
