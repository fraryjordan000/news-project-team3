import { Component, OnInit } from '@angular/core';

import { ArticleComponent } from '../shared/article/article.component';
import { Article } from '../article';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  cards: Article[] = [];
  likesRecieved: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.likesRecieved = false;
    this.auth.getArticles(res=>{
      this.cards = res;
      for(let card of this.cards) {
        card.isLiked = true;
      }
      this.likesRecieved = true;
    });
  }

}
