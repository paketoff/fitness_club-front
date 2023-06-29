import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.currentUser = this.authService.decodeToken(token);
    }
  }

}
