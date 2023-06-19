import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fintess_club-front';

  constructor() { }

  @ViewChild('workouts') workouts!: ElementRef;
  @ViewChild('subscriptions') subscriptions!: ElementRef;
  @ViewChild('coaches') coaches!: ElementRef;

  scrollToElement(element: ElementRef): void {
    element.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
