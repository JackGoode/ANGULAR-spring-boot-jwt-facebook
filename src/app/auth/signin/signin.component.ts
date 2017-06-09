import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {FacebookService, LoginResponse, LoginOptions} from 'ng2-facebook-sdk';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService,
              private fb: FacebookService) {
  }

  ngOnInit() {
    this.fb.init({
      appId: 'REPLACE_THIS',
      version: 'v2.8'
    });
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password);
  }

  onFacebookLogin() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,user_likes,user_education_history,user_work_history'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        this.authService.facebookLogin(res.authResponse.accessToken);
        console.log('Logged in', res);
      })
      .catch((error) => console.log(error) );
  }


}
