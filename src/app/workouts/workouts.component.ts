import { Component, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  constructor(private workoutService: WorkoutService) { }

  workouts: any[] = [];

  ngOnInit(): void {
    this.getAllWorkouts();
  }

  getAllWorkouts() {
    return this.workoutService.getAllWorkouts()
      .subscribe(workouts => this.workouts = workouts);
  }

}
