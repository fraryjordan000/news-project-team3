import { Component, OnInit } from '@angular/core';
import { ApiFetchService } from '../api-fetch.service';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.scss']
})
export class HeadlinesComponent implements OnInit {

  // In html, *ngFor="let card in cards" -- use card.title, card.description, card.url, and card.urlToImage
  cards: any = [];
  currentCategory: string = 'business';

  constructor(private fetch: ApiFetchService) { }

  ngOnInit() {
    this.getCategory(this.currentCategory);
  }

  getCategory(str: string) {
    this.fetch.topHeadlines(str, (res) => {
      this.cards = res.articles;
    });
  }

}
