import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../question';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class QuizComponent implements OnInit {
  @Input() pytanie: Question = new Question();
  @Output() odpowiedziano = new EventEmitter<boolean>();
  wybranoOdpowiedz = false;
  isCorrectSelected = false;

  constructor() {}

  ngOnInit() {}

  odp(optionIndex: number) {
    this.pytanie.selectedOptions.fill(false); // Odznacz wszystkie odpowiedzi
    this.pytanie.selectedOptions[optionIndex] = true; // Zaznacz wybraną odpowiedź
    this.isCorrectSelected = optionIndex === this.pytanie.index; // Sprawdź, czy zaznaczono poprawną odpowiedź
    this.wybranoOdpowiedz = true; // Oznacz, że odpowiedź została wybrana
  }

  potwierdzOdpowiedzi() {
    const correctOptionSelected = this.pytanie.selectedOptions.some(
      (option) => option === true
    );
    const allOptionsCorrect = this.pytanie.selectedOptions.every(
      (option, index) => option === (index === this.pytanie.index)
    );
    if (correctOptionSelected && allOptionsCorrect) {
      this.odpowiedziano.emit(true);
    } else {
      this.odpowiedziano.emit(false);
    }
  }
}
