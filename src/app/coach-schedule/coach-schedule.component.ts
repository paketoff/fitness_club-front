  import { Component, OnInit } from '@angular/core';
  import { CoachScheduleService } from './coach-schedule.service';

  @Component({
    selector: 'app-coach-schedule',
    templateUrl: './coach-schedule.component.html',
    styleUrls: ['./coach-schedule.component.scss']
  })
  export class CoachScheduleComponent implements OnInit {


    constructor(private coachScheduleService: CoachScheduleService) { }

    schedule: any;

    ngOnInit(): void {
      this.coachScheduleService.getAllSchedules().subscribe(data => {
        console.log(data);
        this.schedule = data;
      });
    }

  }
