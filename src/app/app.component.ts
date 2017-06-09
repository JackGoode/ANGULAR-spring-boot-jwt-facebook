import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log('Init method, access an d refresh tokens set');
    console.log('Access' + this.authService.token);
    console.log('Refresh' + this.authService.refreshToken);
    if (this.authService.isAuthenticated()) {
      this.authService.getUserProfile();
    }
  }

}
