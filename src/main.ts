import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { Question } from './question';
import { QuizComponent } from './quiz/quiz.component';
import { ArtykulComponent } from './Artykuly/artykuly.component';
import data_from_json from './pytania.json';
import data_from_json1 from './Artykuly/data.json';
import data from './mainn.json';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: `main.html`,
  imports: [CommonModule, QuizComponent, ArtykulComponent],
})
export class App {
  wynik = 0;
  quiz = false;
  showingArticle = false;
  text: string = '';
  title: string = '';
  tekst: string = '';
  zdj: string = '';
  wybranoOdpowiedz = false;
  biezacePytanie: Question = new Question();
  numerBiezacegoPytania: number = 1;
  articles: any[] = data_from_json1;

  constructor() {
    this.showMain(1);
  }

  zaladujPytanie(numerPytania: number) {
    var articles: article[] = data_from_json as article[];
    var item = articles.find((e) => e.id === numerPytania);
    if (item != null) {
      this.biezacePytanie.q = item.title;
      this.biezacePytanie.ans = item.text;
      this.biezacePytanie.index = item.index;
      this.quiz = true;
      this.showingArticle = false;
      this.wybranoOdpowiedz = false;
    }
  }

  showArticle(id: number) {
    var articles: article[] = data_from_json1 as article[];
    var item = articles.find((e) => e.id == id);
    if (item != null) {
      this.title = item.title;
      this.text = item.text[0];
      if (item.id === 1) {
        this.zdj =
          'https://e0.pxfuel.com/wallpapers/327/50/desktop-wallpaper-legendary-michael-jordan-basketball-michael-jordan-art-michael-jordan-michael-jordan-be-legendary.jpg';
      }
      if (item.id === 2) {
        this.zdj =
          'https://ca-times.brightspotcdn.com/dims4/default/c9cf120/2147483647/strip/true/crop/512x467+0+0/resize/1200x1095!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F31%2F69%2F2b870d9811f43368cdbae8e423b7%2Fsdut-file-this-march-26-2011-fil-20160902-001';
      }
      if (item.id === 3) {
        this.zdj =
          'https://www.chicagomag.com/wp-content/archive/city-life/June-2018/The-Last-Day-of-the-Chicago-Bulls-Dynasty-NBA-Finals-Game-6-1998/michael-jordan-1998-finals.jpg';
      }
      this.showingArticle = true;
      this.quiz = false;
      this.numerBiezacegoPytania = 1;
      this.wynik = 0;
      this.wybranoOdpowiedz = false;
    }
  }
  showMain(id: number) {
    var articles: article[] = data as article[];
    var item = articles.find((e) => e.id == id);
    if (item != null) {
      this.tekst = item.text[0];
    }
  }

  Pop() {
    this.showingArticle = false;
    this.quiz = false;
  }
  doliczWynik(ok: boolean) {
    if (ok) {
      this.wynik++;
    }
    this.loadNextQuestion();
  }

  potwierdzWybor() {
    if (this.wybranoOdpowiedz) {
      this.wynik++;
    }
  }

  loadNextQuestion() {
    this.numerBiezacegoPytania++;
    if (this.numerBiezacegoPytania > data_from_json.length) {
      this.quiz = false;
      alert('Twój wynik to: ' + this.wynik + '/' + data_from_json.length);
      this.wynik = 0;
      this.numerBiezacegoPytania = 1;
      return;
    }
    this.zaladujPytanie(this.numerBiezacegoPytania);
  }
}

export class article {
  id: number = 0;
  title: string = '';
  text: string[] = [];
  index: number = 0;
}

bootstrapApplication(App);
