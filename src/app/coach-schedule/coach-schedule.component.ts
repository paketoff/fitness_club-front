  import { Component, OnInit } from '@angular/core';
  import { CoachScheduleService } from './coach-schedule.service';

  @Component({
    selector: 'app-coach-schedule',
    templateUrl: './coach-schedule.component.html',
    styleUrls: ['./coach-schedule.component.scss']
  })
  export class CoachScheduleComponent implements OnInit {


    constructor(private coachScheduleService: CoachScheduleService) { }

    schedule: any = [];
    filteredSchedule: any = [];
    selectedDate!: any;
    filteredSurname: any = [];

    ngOnInit(): void {
      this.coachScheduleService.getAllSchedules().subscribe(data => {
        console.log(data);
        this.schedule = data;
        this.filteredSchedule = data;
      });
    }

    //filtration methods
    filterByDate(): void {
      if (this.selectedDate) {
        this.filteredSchedule = this.schedule.filter((item: any) => item.work_date === this.selectedDate);
      } else {
        this.filteredSchedule = this.schedule;
      }
    }

    filterBySurname(): void {
      if(this.filteredSurname) {
        this.filteredSchedule = this.schedule.filter((item: any) => item.coach.surname.toLowerCase().includes(this.filteredSurname.toLowerCase()));
      } else {
        this.coachScheduleService.getAllSchedules().subscribe(data => {
          this.filteredSchedule = data;
        })
      }
    }

  }
