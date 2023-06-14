import { Component, OnInit } from '@angular/core';
import { CoachService } from './coach.service';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {

  constructor(private coachService: CoachService) { }

  coaches: any[] = [];

  ngOnInit(): void {
    this.loadCoaches();
  }

  loadCoaches() {
    this.coachService.getAllCoaches().subscribe(
      data => {
        this.coaches = data;
        console.log(data);
      },
      err => {
        console.error(err);
      }
    );
  }

}
