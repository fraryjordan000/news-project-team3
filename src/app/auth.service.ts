import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { calcBindingFlags } from '@angular/core/src/view/util';

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
    let hasRun: boolean = false;

    this.afAuth.authState.subscribe(user => {
      if(!hasRun) {
        const articlesRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          articles: arr
        }

        articlesRef.set(data);
        this.updateOverall(arr);
        hasRun = true;
      }
    });
  }

  getArticles(cb: Function) {
    let hasRun: boolean = false;

    this.afAuth.authState.subscribe(user => {
      if(!hasRun) {
        const articlesRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        articlesRef.get().subscribe(res => {
          if(!hasRun) {
            cb(res.data().articles);
            hasRun = true;
          }
        });
      }
    });
  }

  addArticle(article: any) {
    this.getArticles(res=>{
      let tmp = res;
      tmp.push(article);
      this.updateArticles(tmp);
    });
  }

  removeArticle(url: string) {
    this.getArticles(res=>{
      let tmp = res;
      for(let c in tmp) {
        if(tmp[c].url == url) {
          tmp.splice(c, 1);
        }
      }
      this.updateArticles(tmp);
    });
  }

  private updateOverall(arr: any) {
    let hasRun: boolean = false;

    this.afAuth.authState.subscribe(() => {
      if(!hasRun) {
        for(let a in arr) {
          const overallRef: AngularFirestoreDocument<any> = this.afs.doc(`overall/${arr[a].url}`);

          let tmp;
          overallRef.get().subscribe(res => {
            tmp = (res.data().likes != undefined) ? res.data().likes : 0;
          })

          let data = {
            likes: tmp + 1
          }

          overallRef.set(data);
        }
        hasRun = true;
      }
    });
  }
}