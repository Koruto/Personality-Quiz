import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, QuizComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Personality Quiz';
}
