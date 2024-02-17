import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { Question } from './question';
import { QuizComponent } from './quiz/quiz.component';
import data_from_json from './pytania.json';
import data_from_json1 from './data.json';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: `main.html`,
  imports: [CommonModule, QuizComponent],
})
export class App {
  wynik = 0;
  quiz = false;
  text: string = '';
  title: string = '';
  wybranoOdpowiedz = false;
  biezacePytanie: Question = new Question();
  numerBiezacegoPytania: number = 1; // Dodaj zmienną do śledzenia numeru bieżącego pytania

  zaladujPytanie(numerPytania: number) {
    var articles: article[] = data_from_json as article[];
    var item = articles.find((e) => e.id === numerPytania);
    if (item != null) {
      this.biezacePytanie.q = item.title;
      this.biezacePytanie.ans = item.text;
      this.biezacePytanie.index = item.index;
      this.quiz = true;
    }
  }

  zaladujArtykul(id: number) {
    var articles: article[] = data_from_json as article[];
    var item = articles.find((e) => e.id == id);
    if (item != null) {
      this.title = item.title;
      this.text = item.text.join('\n');
    }
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
