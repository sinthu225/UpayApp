import { Component, OnInit } from '@angular/core';
import { Productservice } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  showSpinner: boolean = false;

  title: string;
  description: string;
  stock: number;
  image: string;
  price: string;

  constructor(private _Productservice: Productservice) { }

  ngOnInit() {
  }

  addProductHandler() {
    this.showSpinner = true;
    var result = this._Productservice.addProducts(
      this.title, this.description, 
      this.price, this.stock, this.image);

      

      
  }

}
