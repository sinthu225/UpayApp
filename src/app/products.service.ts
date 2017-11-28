import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Product {
  userID: any;
  title: any;
  description: any;
  image: any;
  stock: any;
  price: any;
  id: any;
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

  constructor(private afs: AngularFirestore) { }

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



  getSingleProduct(productID ){
    // const productPath = `products/${productID}`;

    // return this.afs.firestore.doc(productPath).get()
    // .then(docSnapshot => {      
    //   console.log(docSnapshot.data())
    //    return docSnapshot.data();     
    // });

    let productDoc = this.afs.doc('products/'+productID);
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

  


}
