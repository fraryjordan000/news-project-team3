import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

interface User {
  uid: string;
  email: string;
  displayName: string;
  articles: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: Observable<User>;

  constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
                
                this.user = this.afAuth.authState.pipe(switchMap(user => {
                  if(user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                  } else {
                    return of(null);
                  }
                }));
  }
  
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  logOut() {
    this.afAuth.auth.signOut();
    return true;
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
        this.router.navigate(['/headlines']);
      });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      articles: user.articles != undefined ? user.articles : []
    }

    return userRef.set(data)
  }

  updateArticles(arr: any) {
    this.afAuth.authState.subscribe(user => {
      const articlesRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        articles: arr
      }

      articlesRef.set(data);
    });
  }

  getArticles(cb: Function) {
    this.afAuth.authState.subscribe(user => {
      const articlesRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

      articlesRef.get().subscribe(res => {
        cb(res.data().articles);
      });
    });
  }
}