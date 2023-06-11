import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, sequenceEqual, take } from 'rxjs';
import { SurveyService } from './survey-service.service';
import * as q from './questions';
import * as ans from './answers';
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

  nextQuestion(): void {
    if(this.currentIndex <= this.questions.length - 1){
      if(this.surveyForm && this.surveyForm.get('selectedAnswer')){
        const selectedAnswerId = this.surveyForm.get('selectedAnswer')?.value;
        this.surveyService.processAnswer(selectedAnswerId).subscribe(result => {
          this.selectedSubscriptions = result;
          this.selectedCoaches = result;
          if (this.currentIndex === q.Q_AGE_CATEGORY) { 
            if (selectedAnswerId === ans.A_AGE_12_17) { // (if the user is junior)
              this.currentIndex = q.Q_FREQ_TRAINING_J;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            } 
            if (selectedAnswerId === ans.A_AGE_60) { // (if the user is senior)
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === ans.A_AGE_18_59) { // (if the user between 18-59 y.o.)
              this.currentIndex = q.Q_AGE_27; 
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          } 

          else if(this.currentIndex === q.Q_FREQ_TRAINING_J) {
            if(selectedAnswerId === ans.A_ANYTIME_JUN) {
              this.currentIndex = q.Q_TRIAL_TRAINING; // the coach line of questions
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === ans.A_2_3_JUN) {
              this.currentIndex = q.Q_TRIAL_TRAINING; // the coach line of questions
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === q.Q_AGE_27) { // if the user > 27 y.o.
            if(selectedAnswerId === ans.A_YES) { // if true
              this.currentIndex = q.Q_TRAINING_WEEKLY;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === ans.A_NO) {
              this.currentIndex = q.Q_TRIAL_TRAINING; // the coach line of questions
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === q.Q_TRAINING_WEEKLY) {
            if(selectedAnswerId === ans.A_2_3_S) {
              this.currentIndex = q.Q_TRAINING_TIME_S;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === ans.A_UNLIM_S) {
              this.currentIndex = q.Q_TRAINING_TIME_B;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === q.Q_TRAINING_TIME_B) {// in which time the user prefer to fitness (unlimited)
            if(selectedAnswerId === ans.A_MORNING || selectedAnswerId === ans.A_AFTERNOON || selectedAnswerId === ans.A_ANYTIME) {
              this.currentIndex = q.Q_TRIAL_TRAINING; // the coach line of questions
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            } 
          }
          
          else if(this.currentIndex === q.Q_TRAINING_TIME_S){ // in which time the user prefer to fitness (standart)
            if(selectedAnswerId === ans.A_FIRSTH_S || selectedAnswerId === ans.A_SECH_S) {
              this.currentIndex = q.Q_TRIAL_TRAINING; // the coach line of questions
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }          
          
          else if(this.currentIndex === q.Q_TRIAL_TRAINING) { //if the user want to try a coach;
            if(selectedAnswerId === ans.A_YES_COACH) {
              this.currentIndex = q.Q_COACH_GENDER;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            } 
            if(selectedAnswerId === ans.A_NO_COACH) {
              this.recommendedSubscription = this.selectedSubscriptions[0];
              this.surveyForm.reset();
            }
          }
          
          else if(this.currentIndex === q.Q_COACH_GENDER) { //findCoachByGender
            if(selectedAnswerId === ans.A_FEMALE) {
              this.currentIndex = q.Q_COACH_CATEGORY_F; //woman coach
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === ans.A_MALE) {  //man coach
              this.currentIndex = q.Q_COACH_CATEGORY_M;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            } 
            if(selectedAnswerId === ans.A_ANY) { //doesn't matter
              this.currentIndex = q.Q_COACH_CATEGORY_N;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            } 
          }

          else if(this.currentIndex === q.Q_COACH_CATEGORY_F) { //findWomanCoachByCategory {}
            if(selectedAnswerId === ans.A_PERS_COACH_F) { // personal woman coach
              this.currentIndex = q.Q_TRAINING_TIME_F_P;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === ans.A_GROUP_COACH_F) { // group woman coach
              this.currentIndex = q.Q_TRAINING_TIME_F_G;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }   

          else if(this.currentIndex === q.Q_COACH_CATEGORY_M) {
            if(selectedAnswerId === ans.A_PERS_COACH) { //personal man coach
              this.currentIndex = q.Q_TRAINING_TIME_M_P;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === ans.A_GROUP_COACH) { //group man coach
              this.currentIndex = q.Q_TRAINING_TIME_M_G;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === q.Q_COACH_CATEGORY_N) {
            if(selectedAnswerId === ans.A_PERS_COACH_N) { //women || men personal coaches;
              this.currentIndex = q.Q_TRAINING_TIME_N_P;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
            if(selectedAnswerId === ans.A_GROUP_COACH_N) { //women || men group coaches;
              this.currentIndex = q.Q_TRAINING_TIME_N_G; 
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === q.Q_TRAINING_TIME_F_P) {
            if(selectedAnswerId === ans.A_PREF_MORNING_F_P || selectedAnswerId === ans.A_PREF_AFTERNOON_F_P) {
              this.recommendedCoaches = this.selectedCoaches;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === q.Q_TRAINING_TIME_M_P) {
            if(selectedAnswerId === ans.A_PREF_MORNING_M_P || selectedAnswerId === ans.A_PREF_AFTERNOON_M_P) {
              this.recommendedCoaches = this.selectedCoaches;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === q.Q_TRAINING_TIME_N_P) {
            if(selectedAnswerId === ans.A_PREF_MORNING_N_P || selectedAnswerId === ans.A_PREF_AFTERNOON_N_P) {
              this.recommendedCoaches = this.selectedCoaches;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === q.Q_TRAINING_TIME_F_G) {
            if(selectedAnswerId === ans.A_PREF_MORNING_F_G || selectedAnswerId === ans.A_PREF_AFTERNOON_F_G) {
              this.recommendedCoaches = this.selectedCoaches;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === q.Q_TRAINING_TIME_M_G) {
            if(selectedAnswerId === ans.A_PREF_MORNING_M_G || selectedAnswerId === ans.A_PREF_AFTERNOON_M_G) {
              this.recommendedCoaches = this.selectedCoaches;
              this.currentQuestion = this.questions[this.currentIndex];
              this.surveyForm.reset();
            }
          }

          else if(this.currentIndex === q.Q_TRAINING_TIME_N_G) {
            if(selectedAnswerId === ans.A_PREF_MORNING_N_G || selectedAnswerId === ans.A_PREF_AFTERNOON_N_G) {
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
    this.currentIndex = q.Q_AGE_CATEGORY;
    this.currentQuestion = this.questions[this.currentIndex];
    this.surveyForm.reset();
  }
}
