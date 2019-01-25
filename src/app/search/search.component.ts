import { Component, OnInit } from '@angular/core';
import { ApiFetchService } from '../api-fetch.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // In html, *ngFor="let card in cards" -- use card.title, card.description, card.url, and card.urlToImage
  cards: any = [];

  constructor(private fetch: ApiFetchService) { }

  ngOnInit() {
  }

  search(str: string) {
    this.fetch.search(str, (res) => {
      this.cards = res.articles;
      console.log(res.articles);
    });
  }

}
