import { Component, OnInit, Input } from '@angular/core';

import { Article } from '../../article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit {

  @Input() card: Article;

  selected: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    this.selected = !this.selected;
  }

}
