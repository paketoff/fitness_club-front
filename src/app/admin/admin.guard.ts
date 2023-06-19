import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const token = this.authService.getToken();
    const user = this.authService.decodeToken(token);
    
    if (user.role !== 'admin') {
      this.router.navigate(['']); // Редирект на главную страницу, если пользователь не админ
      return false;
    }
    
    return true;
  }
}