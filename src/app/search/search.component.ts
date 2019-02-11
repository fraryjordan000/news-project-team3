import { Component, OnInit } from '@angular/core';
import { ApiFetchService } from '../api-fetch.service';

import { ArticleComponent } from '../shared/article/article.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article } from '../article';
import { AuthService } from '../auth_articles.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // In html, *ngFor="let card in cards" -- use card.title, card.description, card.url, and card.urlToImage
  cards: Article[] = [];
  contentReceived: boolean = false;

  query: string = '';

  constructor(private fetch: ApiFetchService, private auth: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }


  search(str: string) {
    this.contentReceived = false;
    this.spinner.show();
    let searchstr: string;
    if (str === '') {
      searchstr = 'empty';
    } else {
      searchstr = str;
    }

    this.fetch.search(searchstr, (res) => {
      this.cards = this.filterDupes(res.articles);
      this.auth.likesInArray(this.cards, (rs)=>{
        for(let i of rs) {
          this.cards[i].isLiked = true;
        }
        this.contentReceived = true;
        this.spinner.hide();
      });
    });

  }

  filterDupes(arr: any[]) {
    let rtn: any;
    for(let i in arr) {
      for(let j in arr) {
        if(typeof(arr[i]) != "undefined" && typeof(arr[j]) != "undefined") {
          if(arr[i].url == arr[j].url && i != j) {
            arr[j] = undefined;
          }
        }
      }
    }
    rtn = arr.filter(article => article != undefined);
    return rtn;
  }


}
