import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, sequenceEqual, take } from 'rxjs';
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
  selectedCoaches: any = null;
  recommendedCoaches: any = null;

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

  //GOVNOKOD!
  nextQuestion(): void {
    if(this.currentIndex <= this.questions.length - 1){
      if(this.surveyForm && this.surveyForm.get('selectedAnswer')){
        const selectedAnswerId = this.surveyForm.get('selectedAnswer')?.value;
        this.surveyService.processAnswer(selectedAnswerId).subscribe(result => {
          this.selectedSubscriptions = result;
          this.selectedCoaches = result;
          if (this.currentIndex === 0) { 
            if (selectedAnswerId === 3) { // (if the user is junior)
              this.currentIndex = 9;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            } 
            if (selectedAnswerId === 4) { // (if the user is senior)
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === 2) { // (if the user between 18-59 y.o.)
              this.currentIndex = 5; 
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          } 

          else if(this.currentIndex === 9) {
            if(selectedAnswerId === 16) {
              this.currentIndex = 6; // the coach line of questions
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === 17) {
              this.currentIndex = 6; // the coach line of questions
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === 5) { // if the user > 27 y.o.
            if(selectedAnswerId === 18) { // if true
              this.currentIndex = 10;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === 19) {
              this.currentIndex = 6; // the coach line of questions
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === 10) {
            if(selectedAnswerId === 31) {
              this.currentIndex = 3;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === 32) {
              this.currentIndex = 2;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === 2) {// in which time the user prefer to fitness (unlimited)
            if(selectedAnswerId === 11 || selectedAnswerId === 12 || selectedAnswerId === 13) {
              this.currentIndex = 6; // the coach line of questions
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            } 
          }
          
          else if(this.currentIndex === 3){ // in which time the user prefer to fitness (standart)
            if(selectedAnswerId === 14 || selectedAnswerId === 15) {
              this.currentIndex = 6; // the coach line of questions
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }          
          
          else if(this.currentIndex === 6) { //if the user want to try a coach;
            if(selectedAnswerId === 20) {
              this.currentIndex = 7;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            } 
            if(selectedAnswerId === 21) {
              //TODO: show the list of recommended subs;
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.surveyForm.reset();
            }
          }
          
          else if(this.currentIndex === 7) { //findCoachByGender
            if(selectedAnswerId === 22) {
              this.currentIndex = 8; //woman coach
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === 23) {  //man coach
              this.currentIndex = 11;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            } 
            if(selectedAnswerId === 24) { //doesn't matter
              this.currentIndex = 12;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            } 
          }

          else if(this.currentIndex === 8) { //findWomanCoachByCategory {}
            if(selectedAnswerId === 27) { // personal woman coach
              this.currentIndex = 13;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === 28) { // group woman coach
              this.currentIndex = 16;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }   

          else if(this.currentIndex === 11) {
            if(selectedAnswerId === 25) { //personal man coach
              this.currentIndex = 14;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === 26) { //group man coach
              this.currentIndex = 17;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === 12) {
            if(selectedAnswerId === 29) { //women & men personal coaches;
              this.currentIndex = 15;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === 30) { //women & men group coaches;
              this.currentIndex = 18; 
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === 13) {
            if(selectedAnswerId === 33 || selectedAnswerId === 34) {
              this.recommendedCoaches = this.selectedCoaches;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === 14) {
            if(selectedAnswerId === 35 || selectedAnswerId === 36) {
              this.recommendedCoaches = this.selectedCoaches;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === 15) {
            if(selectedAnswerId === 37 || selectedAnswerId === 38) {
              this.recommendedCoaches = this.selectedCoaches;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === 16) {
            if(selectedAnswerId === 39 || selectedAnswerId === 40) {
              this.recommendedCoaches = this.selectedCoaches;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === 17) {
            if(selectedAnswerId === 41 || selectedAnswerId === 42) {
              this.recommendedCoaches = this.selectedCoaches;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === 18) {
            if(selectedAnswerId === 43 || selectedAnswerId === 44) {
              this.recommendedCoaches = this.selectedCoaches;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }
        });
      }
    } else {
      this.recommendedSubscription = this.selectedSubscriptions[0];
      this.recommendedCoaches = this.selectedCoaches;
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
