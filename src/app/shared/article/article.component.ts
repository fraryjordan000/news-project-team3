import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit {

  @Input() card;

  selected: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    this.selected = !this.selected;
  }

}
