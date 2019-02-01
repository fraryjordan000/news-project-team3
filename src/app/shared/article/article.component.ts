import { Component, OnInit, Input } from '@angular/core';

import { Article } from '../../article';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit {

  @Input() card: Article;

  selected: boolean = false;
  processing: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if(this.card.isLiked) {
      this.selected = true;
    }
  }

  clicked() {
    if(!this.processing) {
      this.processing = true;
      setTimeout(() => {
        this.selected = !this.selected;
        if(this.selected) {
          if(typeof(this.card.count) != "undefined") {
            this.card.count++;
          }
          this.auth.addArticle(this.card, ()=>{
            this.processing = false;
          });
        } else {
          if(typeof(this.card.count) != "undefined") {
            this.card.count--;
          }
          this.auth.removeArticle(this.card.url, ()=>{
            this.processing = false;
          });
        }
      }, 150);
    }
  }

}
