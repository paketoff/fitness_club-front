import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TrainingBookingService } from './training-booking.service';



@Component({
  selector: 'app-training-booking',
  templateUrl: './training-booking.component.html',
  styleUrls: ['./training-booking.component.scss']
})
export class TrainingBookingComponent implements OnInit {

  bookForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private trainingBookingService: TrainingBookingService,
    ) { 
      this.bookForm = new FormGroup({
        date: new FormControl(''),
        start_time: new FormControl(''),
        end_time: new FormControl(''),
        coach_name: new FormControl(''),  
        coach_surname: new FormControl(''), 
      });
    }

    ngOnInit(): void {
      const scheduleId = this.route.snapshot.paramMap.get('scheduleId');
      if (scheduleId !== null) {
        const scheduleIdNumber = Number(scheduleId);
        this.trainingBookingService.getScheduleById(scheduleIdNumber).subscribe(data => {
          console.log(data);
          this.bookForm.setValue({
            date: data.work_date,  
            start_time: data.workPeriod_Start,
            end_time: data.workPeriod_End,
            coach_name: data.coach.name, 
            coach_surname: data.coach.surname,
          });
        });
      }
    }


  submit(): void {
    //get scheduleId from the URL;
    const scheduleId = this.route.snapshot.paramMap.get('scheduleId');

    if (scheduleId !== null) {
      this.trainingBookingService.bookTraining(Number(scheduleId), this.bookForm.value).subscribe(() => {
        console.log('Training booked successfully');
      })
    } else {
      console.error('ScheduleId is null');
    }
  }

  

}
