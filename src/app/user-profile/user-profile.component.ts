import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profileForm: FormGroup;
  isEditing: boolean = false;
  currentPage: number = 1;
  limit: number = 5;
  subscriptionInfoForms: FormArray = this.fb.array([]);
  workoutHistoriesForms: FormArray = this.fb.array([]);

  // Creating a FormGroup to hold the FormArray
  subscriptionInfoFormGroup: FormGroup = this.fb.group({
    subscriptions: this.subscriptionInfoForms,
  });

  workoutHistoriesFormGroup: FormGroup = this.fb.group({
    workouts: this.workoutHistoriesForms,
  })


  constructor(
    private fb: FormBuilder, 
    private userProfileService: UserProfileService) {
    this.profileForm = this.fb.group({
      name: [{value: '', disabled: true}],
      surname: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      password: [{value: '', disabled: true}],
      img_src: [{value: '', disabled: true}],
      phone: [{value: '', disabled: true}],
    });
  } 

  ngOnInit(): void {
    this.loadProfile();
    this.loadSubscriptions();
    this.loadWorkouts();
  }

  loadProfile(): void {
    this.userProfileService.getCurrentUser().subscribe(
      user => {
        this.profileForm.patchValue({
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          img_src: user.img_src,
          phone: user.phone,
        });
      }
    );
  }

  loadSubscriptions(): void {
    this.userProfileService.getUserSubscriptions().subscribe(
      subscriptions => {
        subscriptions.forEach((subscription: any) => {
          this.subscriptionInfoForms.push(this.createSubscriptionForm(subscription));
        });
      }
    );
  }

  loadWorkouts(): void {
    this.userProfileService.getUserWorkoutHistories(this.currentPage, this.limit).subscribe(workouts => {
      this.workoutHistoriesForms.clear();
      workouts.data.forEach((workout: any) => {
          this.workoutHistoriesForms.push(this.createUserWorkoutHistoryForm(workout));
      });
    });
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) { 
      this.currentPage--;
      this.loadWorkouts();
    }
  }
  
  onNextPage(): void {
    this.userProfileService.getUserWorkoutHistories(this.currentPage + 1, this.limit).subscribe(workouts => {
      if (workouts.data.length > 0) { 
        this.currentPage++;
        this.workoutHistoriesForms.clear();
        workouts.data.forEach((workout: any) => {
            this.workoutHistoriesForms.push(this.createUserWorkoutHistoryForm(workout));
        });
      }
    });
  }

  createSubscriptionForm(subscription: any): FormGroup {
    return this.fb.group({
      start_period: [{value: subscription.start_period, disabled: true}],
      end_period: [{value: subscription.end_period, disabled: true}],
      trains_count: [{value: subscription.trains_count, disabled: true}],
      price: [{value: subscription.price, disabled: true}],
      status: [{value: subscription.subscriptionStatus.status_name, disabled:true}]
    });
  }

  createUserWorkoutHistoryForm(workoutHistory: any): FormGroup {
    console.log(workoutHistory);
    return this.fb.group({
      date: [{value: workoutHistory.date, disabled: true}],
      start_time: [{value: workoutHistory.start_time, disabled: true}],
      end_time: [{value: workoutHistory.end_time, disabled: true}],
      coach_name: [{value: workoutHistory.coach.name, disabled: true}],
      coach_surname: [{value: workoutHistory.coach.surname, disabled: true}],
      workout: [{value: workoutHistory.workout.workout_name, disabled: true}],
      workout_type: [{value: workoutHistory.workout_type.type_name, disabled: true}],
    });
  }


  startEditing(): void {
    this.isEditing = true;
    this.profileForm.enable(); //unblock the form
  }

  onSubmit(): void {
    const updatedData = this.profileForm.value;

    this.userProfileService.updateCurrentUser(updatedData).subscribe(() => {
      this.isEditing = false;
      this.profileForm.disable(); //block the form after put-request
    });
  }
}
