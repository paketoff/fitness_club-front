import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { SurveyService } from './survey-service.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  surveyForm!: FormGroup;
  questions: any;
  currentQuestion!: any;
  currentIndex: number = 0;
  surveyQuestions$!: Observable<any>;
  selectedSubscriptions: any = null;
  recommendedSubscription: any = null;

  constructor(private fb: FormBuilder, private surveyService: SurveyService) {
    this.surveyForm = this.fb.group({});
   }

  ngOnInit(): void {
    this.surveyService.getQuestions()
    .pipe(take(1))
    .subscribe(questions => {
      console.log(questions); 
      this.questions = questions;
      this.currentQuestion = this.questions[this.currentIndex];
      this.initForm();
    })
    
  }

  private initForm(): void {
    this.surveyForm = this.fb.group({
      selectedAnswer: [null, Validators.required]
    });
  }

  private getSurveyQuestions(): void {
    this.surveyQuestions$ = this.surveyService.getQuestions();
  }

  nextQuestion(): void {
    if(this.currentIndex <= this.questions.length - 1){
      if(this.surveyForm && this.surveyForm.get('selectedAnswer')){
        const selectedAnswerId = this.surveyForm.get('selectedAnswer')!.value;
        this.surveyService.processAnswer(selectedAnswerId).subscribe(result => {
          this.selectedSubscriptions = result;
          if (this.currentIndex === 0) { // first question
            if (selectedAnswerId === 4 || selectedAnswerId === 3) {
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.surveyForm.reset();
            } else {
              this.currentIndex++;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          } else if(this.currentIndex === 1){ // second question
            if(selectedAnswerId === 5 || selectedAnswerId === 8){
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.surveyForm.reset();
            } else if(selectedAnswerId === 6) {
              this.currentIndex = 5;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            } else if(selectedAnswerId === 7) {
              this.currentIndex = 2;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          } 
          else if(this.currentIndex === 2){ // third question
            if(selectedAnswerId === 9) { //standart subscription answer was picked
              this.currentIndex = 4; // goto 5 question;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }  
          } 
          else if(this.currentIndex === 4) { //fifth question
            if(selectedAnswerId === 14 || selectedAnswerId === 15) {
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.surveyForm.reset();
            }
          } 
          else if(this.currentIndex === 5) { //sixth question
            if(selectedAnswerId === 10) {
            this.currentIndex = 3; //goto 4 question
            }
            this.currentQuestion = this.questions[this.currentIndex];
            this.surveyForm.reset();
          }
          else if(this.currentIndex === 3) { //fourth question
            if(selectedAnswerId === 11 || selectedAnswerId === 12 || selectedAnswerId === 13) {
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.surveyForm.reset();
            }
          } else {
            this.currentIndex++;
            this.currentQuestion = this.questions[this.currentIndex];
            this.surveyForm.reset();
          }
        });
      }
    } else {
      this.recommendedSubscription = this.selectedSubscriptions[0];
      this.surveyForm.reset();
    }
  }
  
  
  prevQuestion(): void{
    if(this.currentIndex > 0){
      this.currentIndex--;
      this.currentQuestion = this.questions[this.currentIndex];
      this.surveyForm.reset();
      if(this.surveyForm && this.surveyForm.get('selectedAnswer')){
        const selectedAnswerId = this.surveyForm.get('selectedAnswer')!.value;
        this.surveyService.processAnswer(selectedAnswerId).subscribe(result => {
          this.selectedSubscriptions = result;
        });
      }
    }
  }
}
