import { Component, OnInit } from '@angular/core';
import { ApiFetchService } from '../api-fetch.service';

import { ArticleComponent } from '../shared/article/article.component';
import { Article } from '../article';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // In html, *ngFor="let card in cards" -- use card.title, card.description, card.url, and card.urlToImage
  cards: Article[] = [];

  query: string = '';

  constructor(private fetch: ApiFetchService) { }

  ngOnInit() {
  }


  search(str: string) {
    if (str === '') {
      let emp;
      emp = 'empty';
      this.fetch.search(emp, (res) => {
        this.cards = res.articles;
      });

    } else {
      this.fetch.search(str, (res) => {
        this.cards = res.articles;
      });
    }

  }


}
