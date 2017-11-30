import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  phoneNumber?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;

  error;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })

  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }

  gitLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.oAuthLogin(provider);
  }

  emailLogin(email, password) {

    this.afAuth.auth.signInWithEmailAndPassword(
      email,
      password      
    ).then(
      (success) => {
        let uid = success.uid;
        let email = success.email;
        let displayName = success.displayName;
        let photoURL = success.photoURL;
        let phoneNumber = success.phoneNumber;
        const user : User = {uid, email, photoURL, displayName }        
        this.updateUserData(user);
        this.router.navigate(['/']);
    })
  }

  signUp(email, password, name , pnum){
    this.afAuth.auth.createUserWithEmailAndPassword(
      email,
       password
     ).then(
       (success) => {
         
        let uid = success.uid;
        let email = success.email;
        let displayName = name;
        let photoURL = "http://www.eindhovenstartups.com/wp-content/uploads/2016/08/blank_male_avatar.jpg";
        let phoneNumber = pnum;

        const user : User = {uid, email, photoURL, displayName, phoneNumber }
        
        this.updateUserData(user);
        this.router.navigate(['/']);
     }).catch(
       (err) => {
       this.error = err;
     })
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {

        this.updateUserData(credential.user);
        this.router.navigate(['/']);
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber
    }

    this.afs.firestore.doc(`users/${user.uid}`).get()
    .then(docSnapshot => {
      if (!docSnapshot.exists) {
        return userRef.set(data)
      }        
    });

    
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}


