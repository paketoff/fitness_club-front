import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  currentUser: any = null;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.currentUser = this.authService.decodeToken(token);
    }
    this.setupSmoothScroll();
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
