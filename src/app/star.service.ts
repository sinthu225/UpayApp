import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Rating {
  userId: any;
  productId: any;
  value: number;
  uname: string;
}

@Injectable()
export class Ratingservice {

  constructor(private afs: AngularFirestore) { }

 
  getUserRatings(userId) {
    const ratingRef = this.afs.collection('ratings', ref => ref.where('userId', '==', userId) );
    return ratingRef.valueChanges();
  }

 
  getProductRatings(productId) {
    const ratingRef = this.afs.collection('ratings', ref => ref.where('productId', '==', productId) );
    return ratingRef.valueChanges();
  }

  
  setRating(userId, productId, value, uname) {    
    const rating: Rating = { userId, productId, value, uname };
    const ratingPath = `ratings/${rating.userId}_${rating.productId}`;
    return this.afs.doc(ratingPath).set(rating)
  }
}
