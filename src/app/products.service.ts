import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';

export interface Product {
  title: any;
  description: any;
  image: any;
  stock: any;
  price: any;
  id: any;
}

export interface AddProduct {
  title: any;
  description: any;
  image: any;
  stock: any;
  price: any;
}

export interface CartItem {
  productId: any;
  qty: number;
  title: string;
  subTotal: any;
  userID: any;
}



@Injectable()
export class Productservice {



  private ProductsCollection: AngularFirestoreCollection<AddProduct>

  constructor(private afs: AngularFirestore, private _router: Router) { 
    this.ProductsCollection = afs.collection<AddProduct>('products');

  }

  getProducts() {
    const productCollection: AngularFirestoreCollection<Product> = this.afs.collection('products');
    return productCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }



  searchProducts(start, end) {
    const productCollection: AngularFirestoreCollection<Product> = this.afs.collection('products', ref => ref.limit(4).orderBy('title').startAt(start).endAt(end))
    return productCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }



  getSingleProduct(productID) {
    let productDoc = this.afs.doc('products/' + productID);
    return productDoc.valueChanges();
  }

  getCartItems(userID) {
    const cartItemRef = this.afs.collection('baskets', ref => ref.where('userID', '==', userID));
    return cartItemRef.valueChanges();
  }

  addToCart(productId, qty, title, subTotal, userID) {

    const cartitem: CartItem = { productId, qty, title, subTotal, userID };
    const cartPath = `baskets/${cartitem.userID}_${cartitem.productId}`;

    this.afs.firestore.doc(cartPath).get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          cartitem.qty = docSnapshot.data().qty + 1;
          cartitem.subTotal = cartitem.qty * cartitem.subTotal;
          this.afs.doc(cartPath).set(cartitem).then(
            (res) => {
              const productpath = `products/${cartitem.productId}`;
              this.afs.firestore.doc(productpath).get()
                .then(docSnapshot => {
                  let tmpProduct = docSnapshot.data();
                  tmpProduct.stock = tmpProduct.stock - 1;
                  const product = tmpProduct;
                  this.afs.doc(productpath).set(product);
                })
            }
          )
        }
        else {
          return this.afs.doc(cartPath).set(cartitem)
        }
      });
  }

  removeFromCart(productId, userID, qty) {
    const cartPath = `baskets/${userID}_${productId}`;
    const productPath = `products/${productId}`;
    this.afs.firestore.doc(productPath).get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          const tempProduct = docSnapshot.data();
          tempProduct.stock = tempProduct.stock + qty
          this.afs.doc(productPath).set(tempProduct).then(
            (res) => {
              this.afs.firestore.doc(cartPath).get()
                .then(docSnapshot => {
                  this.afs.doc(cartPath).delete();
                })
            }
          )
        }
      });
  }

  addProducts(title, description, price, stock, image) {
    const id = this.afs.createId();
    const item: AddProduct = { title, description, image, stock, price };
    this.ProductsCollection.add(item).then(
      res => {
        this._router.navigate(['/product-details, , res.id]'])
        console.log(res);
      }
    )
    
  }




}
