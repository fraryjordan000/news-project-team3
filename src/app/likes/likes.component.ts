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

  overall: any[] = [];
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
        this.sortOverall();
        this.overallRecieved = true;
      });
    });
  }

  sortOverall() {
    console.log(this.overall);
    let passAgain = true;
    let rtn = this.overall;
    let changes = [];
    while(passAgain) {
        passAgain = false;
        for(let i = 1; i < rtn.length; i++) {
            let tmp = rtn[i - 1].count;
            if(tmp > rtn[i].count){
                passAgain = true;
                changes.push(i);
            }
        }
        if(passAgain){
            for(let i = changes.length - 1; i >= 0; i--) {
                let tmp = rtn[changes[i]];
                rtn[changes[i]] = rtn[changes[i] - 1];
                rtn[changes[i] - 1] = tmp;
                changes.pop();
            }
        }
    }

    rtn.reverse();
    this.overall = rtn;
    console.log(this.overall);
  }

}
