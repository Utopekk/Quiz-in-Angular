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
  isAnswerLocked = false;
  czerwony = false;
  zielony = false;
  correctImageUrl =
    'https://www.courant.com/wp-content/uploads/migration/2020/04/19/CBGEOYHDWJG7BANB4KUMABZVGE.jpg';
  errorImageUrl =
    'https://i.pinimg.com/736x/b7/74/4d/b7744d27a9fde09b7f256f7a1a4defcb.jpg';

  constructor() {}

  ngOnInit() {}

  odp(optionIndex: number) {
    if (!this.isAnswerLocked) {
      this.pytanie.selectedOptions.fill(false);
      this.pytanie.selectedOptions[optionIndex] = true;
      this.isCorrectSelected = optionIndex === this.pytanie.index;
      this.wybranoOdpowiedz = true;
      this.isAnswerLocked = true;
    }
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

    this.pytanie.selectedOptions.fill(false);
    this.wybranoOdpowiedz = false;
    this.isAnswerLocked = false;
  }
}
