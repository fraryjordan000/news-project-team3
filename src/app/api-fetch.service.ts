import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchService {

  constructor(private http: HttpClient) {}
  
  private searchStart: string = 'https://newsapi.org/v2/everything?q=';
  private searchEnd: string = '&apiKey=c3bb2f311334412fa4f71520d1f62e0e';

  search(str: string, cb?: Function) {
    this.get(this.searchStart+str+this.searchEnd, cb);
  }

  get(url: string, cb?: Function) {
    let tmp: any;
    this.http.get(url).subscribe(
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
