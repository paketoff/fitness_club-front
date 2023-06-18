import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CoachProfileService } from './coach-profile.service';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.scss']
})
export class CoachProfileComponent implements OnInit {

  profileForm: FormGroup;
  isEditing: boolean = false;
  currentPage: number = 1;
  limit: number = 5;
  scheduleInfoForms: FormArray = this.fb.array([]);
  editingSchedules: boolean[] = [];

  scheduleInfoFormGroup: FormGroup = this.fb.group({
    schedules: this.scheduleInfoForms,
  })

  constructor(
    private fb: FormBuilder,
    private coachProfileService: CoachProfileService,
    ) { 
      this.profileForm = this.fb.group({
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
      })
    }

  startEditingSchedule(index: number): void {
    this.editingSchedules[index] = true;
    this.scheduleInfoForms.at(index).enable();
  }

  ngOnInit(): void {
    this.loadProfile();
    this.loadSchedules();
  }

  loadProfile(): void {
    this.coachProfileService.getCurrentCoach().subscribe(
      coach => {
        console.log(coach);
        this.profileForm.patchValue({
          id_coach: coach.id_coach,
          name: coach.name,
          surname: coach.surname,
          salary: coach.salary,
          password: coach.password,
          img_url: coach.img_url,
          rating: coach.rating,
          email: coach.email,
          train_price: coach.train_price,
          category: coach.category,
          gender: coach.gender,
          role: coach.role,
          qualifications: coach.qualifications,
          schedules: coach.schedules,
        });
      }
    )
  }

  loadSchedules(): void {
    this.coachProfileService.getScheduleForCoach().subscribe(
      schedules => {
        console.log(schedules); //добавьте это, чтобы увидеть что возвращает сервис
        schedules.data.forEach((schedule: any) => {
          this.scheduleInfoForms.push(this.createScheduleForm(schedule));
        });
      }
    )
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) { 
      this.currentPage--;
      this.loadSchedules();
    }
  }
  
  onNextPage(): void {
    this.coachProfileService.getScheduleForCoach(this.currentPage + 1, this.limit).subscribe(schedules => {
      if (schedules.data.length > 0) { 
        this.currentPage++;
        this.scheduleInfoForms.clear();
        schedules.data.forEach((schedule: any) => {
            this.scheduleInfoForms.push(this.createScheduleForm(schedule));
        });
      }
    });
  }

  createScheduleForm(schedule: any): FormGroup {
    return this.fb.group({
      id_schedule: schedule.id_schedule,
      work_date: [{value: schedule.work_date || '', disabled: schedule.id_schedule !== undefined}],
      workPeriod_Start: [{value: schedule.workPeriod_Start || '', disabled: schedule.id_schedule !== undefined}],
      workPeriod_End: [{value: schedule.workPeriod_End || '', disabled: schedule.id_schedule !== undefined}],
      additional_info: [{value: schedule.additional_info || '', disabled: schedule.id_schedule !== undefined}],
      isBooked: [{value: schedule.isBooked || false, disabled: true}],
      coach_id: schedule.coach_id
    });
  }

  startEditing(): void {
    this.isEditing = true;
    this.profileForm.enable(); // unblock the form
  }

  onSubmit(): void {
    const updatedData = this.profileForm.value;
    this.coachProfileService.updateCurrentCoach(updatedData).subscribe(() => {
      this.isEditing = false;
      this.profileForm.disable(); // block the form after put-request
    });
  }

  updateSchedule(index: number): void {
    if (!this.editingSchedules[index]) {
      this.startEditingSchedule(index);
    } else {
      const updatedData = this.scheduleInfoForms.at(index).value;
      const id = updatedData.id_schedule;
      this.coachProfileService.updateSchedule(id, updatedData).subscribe(() => {
        this.editingSchedules[index] = false;
        this.scheduleInfoForms.at(index).disable();
      });
    }
  }

  submitSchedules(): void {
    this.scheduleInfoForms.controls.forEach((scheduleControl: AbstractControl, index: number) => {
      const scheduleForm = scheduleControl as FormGroup;
      if (scheduleForm.dirty && this.editingSchedules[index]) {
        const schedule = scheduleForm.value;
        console.log(schedule);
        if (schedule.id_schedule) {
          this.coachProfileService.updateSchedule(schedule.id_schedule, schedule).subscribe(() => {
            console.log(`Schedule ${index + 1} updated`);
          });
        } else {
          this.coachProfileService.createCoachSchedule(schedule).subscribe(() => {
            console.log(`Schedule ${index + 1} created`);
          });
        }
      }
    });
  }
  
    addSchedule(): void {

      let coachId: any;

      this.coachProfileService.getCurrentCoach().subscribe(coach => {
        coachId = coach.id_coach;
    
        const newSchedule = this.createScheduleForm({
          work_date: new Date(),
          workPeriod_Start: '',
          workPeriod_End: '',
          additional_info: '',
          isBooked: false,
          coach_id: coachId,  
        });
    
        this.scheduleInfoForms.push(newSchedule);
        this.startEditingSchedule(this.scheduleInfoForms.length - 1);
      });
  
  }
}
