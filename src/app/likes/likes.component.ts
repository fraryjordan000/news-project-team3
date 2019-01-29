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

  likes: Article[] = [];
  likesRecieved: boolean = false;

  overall: Article[] = [];
  overallRecieved: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.getLiked();
    this.getOverall();
  }

  getLiked() {
    this.likesRecieved = false;
    this.auth.getArticles(res=>{
      this.likes = res;
      for(let card of this.likes) {
        card.isLiked = true;
      }
      this.likesRecieved = true;
    });
  }

  getOverall() {
    this.overallRecieved = false;
    this.auth.getOverall(res=>{
      this.overall = res;
      this.auth.likesInArray(this.overall, rs=>{
        for(let i of rs) {
          this.overall[i].isLiked = true;
        }
        this.overallRecieved = true;
      });
    });
  }

}
