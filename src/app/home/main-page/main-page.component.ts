import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private setupSmoothScroll(): void {
    const links = document.querySelectorAll('a[data-target]');

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        const targetId: any = link.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

}
