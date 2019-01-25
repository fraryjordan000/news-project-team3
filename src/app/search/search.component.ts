import { Component, OnInit } from '@angular/core';
import { ApiFetchService } from '../api-fetch.service';

import { ArticleComponent } from '../shared/article/article.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // In html, *ngFor="let card in cards" -- use card.title, card.description, card.url, and card.urlToImage
  cards: any = [];
  card = {
    url: "https://google.com",
    urlToImage: this.sanitizer.bypassSecurityTrustUrl("https://media.pitchfork.com/photos/5c49d4dea8b1520c39cc9b4d/1:1/w_500/Better-Oblivion-Community-Center.jpg"),
    title: "Better oblivion review",
    description: "like a soap opera of modern politics"
  }

  constructor(private fetch: ApiFetchService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  search(str: string) {
    this.fetch.search(str, (res) => {
      this.cards = res.articles;
      console.log(res.articles);
    });
  }

}
