import { Component, OnInit } from '@angular/core';
import { ApiFetchService } from '../api-fetch.service';

import { ArticleComponent } from '../shared/article/article.component';
import { Article } from '../article';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // In html, *ngFor="let card in cards" -- use card.title, card.description, card.url, and card.urlToImage
  cards: Article[] = [];
  contentRecieved: boolean = false;

  query: string = '';

  constructor(private fetch: ApiFetchService, private auth: AuthService) { }

  ngOnInit() {
  }


  search(str: string) {
    this.contentRecieved = false;
    let searchstr: string;
    if (str === '') {
      searchstr = 'empty';
    } else {
      searchstr = str;
    }

    this.fetch.search(searchstr, (res) => {
      this.cards = res.articles;
      this.auth.likesInArray(this.cards, (rs)=>{
        for(let i of rs) {
          this.cards[i].isLiked = true;
        }
        this.contentRecieved = true;
      });
    });

  }


}
