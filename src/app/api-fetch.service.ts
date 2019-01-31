import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchService {

  constructor(private http: HttpClient) {}
  
  private searchStart: string = 'https://newsapi.org/v2/everything?q=';
  private searchEnd: string = '&apiKey=c3bb2f311334412fa4f71520d1f62e0e';

  private headlinesStart: string = 'https://newsapi.org/v2/top-headlines?country=us&category=';
  private headlinesEnd: string = '&apiKey=c3bb2f311334412fa4f71520d1f62e0e';

  search(str: string, cb: Function) {
    this.get(this.searchStart+str+this.searchEnd, cb);
  }

  topHeadlines(category: string, cb: Function) {
    this.get(this.headlinesStart+category+this.headlinesEnd, cb);
  }

  private get(url: string, cb: Function) {
    let tmp: any;
    let parent = this;
    this.http.get(url).subscribe(
      function(res) {
        tmp = res;
        if(cb != undefined) {
          cb(parent.filterDuplicates(res));
        }
      }
    );
    return tmp;
  }

  private filterDuplicates(arr: any) {
    return arr;
  }


}
