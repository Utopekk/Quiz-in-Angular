import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../question';
import { CommonModule } from '@angular/common';
import data_from_json1 from './data.json';

@Component({
  selector: 'app-artykuly',
  templateUrl: './artykuly.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ArtykulComponent implements OnInit {
  constructor() {}
  quiz = false;
  showingArticle = false;
  text: string = '';
  title: string = '';

  ngOnInit() {}
  showArticle(id: number) {
    var articles: article[] = data_from_json1 as article[];
    var item = articles.find((e) => e.id == id);
    if (item != null) {
      this.title = item.title;
      this.text = item.text[0];
      this.showingArticle = true;
      this.quiz = false;
    }
  }
}
export class article {
  id: number = 0;
  title: string = '';
  text: string[] = [];
  index: number = 0;
}
