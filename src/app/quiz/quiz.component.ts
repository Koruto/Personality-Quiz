import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { quizData as quizQuestions } from '../../assets/quiz_question';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  title: string = '';
  questions$!: Observable<any>;
  questionSelected$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  answers: string[] = [];
  answerSelected: string = '';
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quizQuestions) {
      this.finished = false;
      this.title = quizQuestions.title;
      this.questions$ = new Observable((observer) => {
        observer.next(quizQuestions.questions);
      });
      this.questionIndex = 0;
      this.questionMaxIndex = quizQuestions.questions.length;
      this.questions$.subscribe((questions) => {
        this.questionSelected$.next(questions[this.questionIndex]);
      });
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questions$.subscribe((questions) => {
        this.questionSelected$.next(questions[this.questionIndex]);
      });
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected =
        quizQuestions.results[
          finalAnswer as keyof typeof quizQuestions.results
        ];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });

    return result;
  }
}
