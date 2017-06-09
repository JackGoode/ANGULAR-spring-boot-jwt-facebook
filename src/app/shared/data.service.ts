import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {FacebookUserData} from "./facebook-user-data.model";
import {Response} from "@angular/http";
@Injectable()
export class DataService {
  userData: FacebookUserData;

  constructor(private authService: AuthService) {
    this.init();
  }

  init() {
    this.authService.facebookDataLoaded.subscribe(
      (response: Response) => {
        const responseJson = response.json();
        this.userData = new FacebookUserData(
          responseJson['id'],
          responseJson['first_name'],
          responseJson['last_name'],
          responseJson['email'],
          responseJson['location'],
          responseJson['education'],
          responseJson['work']);
      });

    this.authService.userLoggedOut.subscribe(() => {
      this.userData = null;
    });
  }

  getUserData() {
    return this.userData;
  }

}
