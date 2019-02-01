import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Article } from './article';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

interface User {
  uid: string;
  email: string;
  articles: any;
  displayName: string;
  photoURL?: string
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
    let hasRun: boolean = false;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    userRef.get().subscribe(res=>{
      if(res.data() == undefined && !hasRun) {
        // if(typeof(res.data().articles) == 'undefined') {}
        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          articles: []
        };

        hasRun = true;
    
        return userRef.set(data);
      }
    });
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
            cb(res.data().articles != undefined ? res.data().articles : []);
            hasRun = true;
          }
        });
      }
    });
  }

  getOverall(cb: Function) {
    let hasRun: boolean = false;
    const overallRef: AngularFirestoreDocument<any> = this.afs.doc('overall/data');

    overallRef.get().subscribe(res => {
      if(!hasRun) {
        cb(res.data().articles);
        hasRun = true;
      }
    });
  }

  addArticle(article: Article, cb: Function) {
    this.getArticles(res=>{
      this.addToOverall(article, ()=>{
        cb();
      });

      function genTempArticle(art: Article) {
        let rtn: Article = {
          url: art.url,
          urlToImage: art.urlToImage,
          title: art.title,
          description: art.description
        }
        return rtn;
      }

      let tmpArticle: Article = genTempArticle(article);

      if(typeof(tmpArticle.count) != "undefined") {
        delete tmpArticle.count;
      }
      
      let tmp = res;
      
      tmp.push(tmpArticle);
      this.updateArticles(tmp);
    });
  }

  removeArticle(url: string, cb: Function) {
    this.getArticles(res=>{
      let tmp = res;
      for(let c in tmp) {
        if(tmp[c].url == url) {
          tmp.splice(c, 1);
        }
      }
      this.updateArticles(tmp);
      this.removeFromOverall(url, ()=>{
        cb();
      });
    });
  }

  likesInArray(arr: any, cb: Function) {
    this.getArticles(res=>{
      let rtn = [];
      for(let i in res) {
        for(let j in arr) {
          if(res[i].url == arr[j].url) {
            rtn.push(j);
          }
        }
      }
      cb(rtn);
    });
  }

  private addToOverall(article: any, cb: Function) {
    let hasRun: boolean = false;
    const overallRef: AngularFirestoreDocument<any> = this.afs.doc('overall/data');
        
    overallRef.get().subscribe(res=>{
      let tmp = res.data().articles;
      let found = false;
      if(!hasRun) {
        for(let i in tmp) {
          if(tmp[i].url == article.url) {
            tmp[i].count++;
            found = true;
          }
        }
        if(!found) {
          tmp.push({
            url: article.url,
            urlToImage: article.urlToImage,
            title: article.title,
            description: article.description,
            count: 1
          });
        }
        overallRef.set({articles: tmp});
        hasRun = true;
        cb();
      }
    });
  }

  private removeFromOverall(url: string, cb: Function) {
    let hasRun: boolean = false;
    const overallRef: AngularFirestoreDocument<any> = this.afs.doc('overall/data');

    overallRef.get().subscribe(res=>{
      if(!hasRun) {
        let tmp = res.data().articles;
        for(let i in tmp) {
          if(tmp[i].url == url) {
            if(tmp[i].count <= 1) {
              tmp.splice(i, 1);
            } else {
              tmp[i].count--;
            }
          }
        }
        overallRef.set({articles: tmp});
        hasRun = true;
        cb();
      }
    });
  }
}