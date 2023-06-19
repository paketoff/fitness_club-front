import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserProfileService } from '../user-profile/user-profile.service';
import { CoachProfileService } from '../coach-profile/coach-profile.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  coaches: any[] = [];
  subscriptions: any[] = [];
  selectedId!: number;

  userEntity: any;
  coachEntity: any;
  subscriptionEntity: any;

  userProfileForm: FormGroup;

  coachProfileForm: FormGroup;
  


  constructor(
    private adminService: AdminService,
    private fb: FormBuilder, 
    ) 
    {
      this.userProfileForm = this.fb.group({
        id_user: [{value: '', disabled: true}],
        name: [{value: '', disabled: true}],
        surname: [{value: '', disabled: true}],
        email: [{value: '', disabled: true}],
        password: [{value: '', disabled: true}],
        img_src: [{value: '', disabled: true}],
        phone: [{value: '', disabled: true}],
    }),
      this.coachProfileForm = this.fb.group({
        id_coach: [{value: '', disabled: true}],
        name: [{value: '', disabled: true}],
        surname: [{value: '', disabled: true}],
        salary: [{value: '', disabled: true}],
        password: [{value: '', disabled: true}],
        rating: [{value: '', disabled: true}],
        img_url: [{value: '', disabled: true}],
        email: [{value: '', disabled: true}],
        train_price: [{value: '', disabled: true}],
        category: [{value: '', disabled: true}],
        gender: [{value: '', disabled: true}],
        role: [{value: '', disabled: true}],
        qualifications: [{value: '', disabled: true}],
        schedules: [{value: '', disabled: true}],
      });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  getAllSubscriptions(): void {
    this.adminService.getAllSubscriptions().subscribe((data: any) => {
      this.subscriptions = data;
    })
  }

  getUserById(): void {
    this.adminService.getUserById(this.selectedId).subscribe((data: any) => {
      this.userEntity = data;
    });
  }

  deleteUserById(): void {
    this.adminService.deleteUserById(this.selectedId).subscribe(() => {
      this.getAllUsers(); 
    });
  }

  getCoachById(): void {
    this.adminService.getCoachById(this.selectedId).subscribe(() => {
      
    });
  }

  deleteCoachById(): void {
    this.adminService.deleteCoachById(this.selectedId).subscribe(() => {

    });
  }

  showUsers = true; // Let's show the users by default
  showCoaches = false;
  showSubscriptions = false;


  showSection(section: string): void {
    // Reset all the states
    this.showUsers = false;
    this.showCoaches = false;
    this.showSubscriptions = false;

    switch(section) {
      case 'users':
        this.showUsers = true;
        break;
      case 'coaches':
        this.showCoaches = true;
        break;
      case 'subscriptions':
        this.showSubscriptions = true;
        break;
    }
  }

  onUserSubmit(): void {
    const updatedDataUser = this.userProfileForm.value;
    const user_id = this.userProfileForm.get('id_user')?.value;

    this.adminService.updateUserById(updatedDataUser,user_id).subscribe(() => {
      this.getAllUsers();
    });
  }

  onCoachSubmit(): void {
    const updatedDataCoach = this.coachProfileForm.value;
    const coach_id = this.coachProfileForm.get('id_coach')?.value;

    this.adminService.updateCoachById(updatedDataCoach, coach_id).subscribe(() => {
      this.getAllUsers(); 
    });
  }
}
