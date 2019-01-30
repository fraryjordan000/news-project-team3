import { Component, OnInit } from '@angular/core';

import { ApiFetchService } from '../api-fetch.service';
import { AuthService } from '../auth.service';

import { ArticleComponent } from '../shared/article/article.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article } from '../article';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.scss']
})
export class HeadlinesComponent implements OnInit {

  // In html, *ngFor="let card in cards" -- use card.title, card.description, card.url, and card.urlToImage
  cards: Article[] = [];
  currentCategory: string = 'business';

  contentRecieved: boolean = false;

  constructor(private fetch: ApiFetchService, private auth: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCategory('technology');
  }

  getCategory(str: string) {
    this.contentRecieved = false;
    this.spinner.show();
    this.fetch.topHeadlines(str, (res) => {
      this.cards = [];
      for(let i = 0; i < res.articles.length; i++) {
        let tmp: Article = {
          title: res.articles[i].title,
          description: res.articles[i].description,
          urlToImage: res.articles[i].urlToImage,
          url: res.articles[i].url
        };
        this.cards.push(tmp);
      }
      this.auth.likesInArray(this.cards, (rs)=>{
        for(let i of rs) {
          this.cards[i].isLiked = true;
        }
        this.contentRecieved = true;
        this.spinner.hide();
      });
    });
  }

  onChange(str: string) {
    this.getCategory(str);
  }

}
