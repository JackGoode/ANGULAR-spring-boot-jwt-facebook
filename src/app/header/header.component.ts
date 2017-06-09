import {Component, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {DataService} from "../shared/data.service";
import {UserProfile} from "../shared/user-profile.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: UserProfile;
  profileString = 'Profile';

  constructor(public authService: AuthService, private dataService: DataService) {}

  ngOnInit() {
    this.authService.userProfileChanged.subscribe(
      (response: Response) => {
        this.user = new UserProfile(response['first_name'], response['last_name'], response['username']);
        this.profileString = this.user.first_name + ' ' + this.user.last_name;
      }
    );
  }

  onLogout() {
    this.profileString = 'Profile';
    this.authService.logout();
  }

}
