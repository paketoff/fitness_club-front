import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profileForm: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private userProfileService: UserProfileService) {
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
