import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchService {

  constructor(private http: HttpClient) {}
  
  private topHeadlines: string = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=c3bb2f311334412fa4f71520d1f62e0e';

  getTopHeadlines(cb?: Function) {
    let tmp: any;
    this.http.get(this.topHeadlines).subscribe(
      function(res) {
        tmp = res;
        if(cb != undefined) {
          cb(res);
        }
      }
    );
    return tmp;
  }
}
