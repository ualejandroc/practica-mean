import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practica-mean';

  constructor(private authService: AuthService,
    private router: Router ){}


  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  fullName(){
    return this.authService.currentUser.fullName();
  }

  logout(){
    this.authService.logout();
  }


  toHome(){
    this.router.navigateByUrl('/')
  }

}




