import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {UserProfile} from "../shared/user-profile.model";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  token: string;
  refreshToken: string;

  // User data
  username: string;
  facebookDataLoaded = new Subject();
  userProfileChanged = new Subject();
  userLoggedOut = new Subject();

  baseUrl = 'http://localhost:9966/api/';
  facebookLoginUrl = 'http://localhost:9966/facebookLogin';

  loginUrl = this.baseUrl + 'auth/login';
  signUpUrl = this.baseUrl + 'signup';
  refreshUrl = this.baseUrl + 'token';
  verifyUrl = this.baseUrl + 'me';
  fbDataUrl = this.baseUrl + 'me/fbData';
  getProfileUrl = this.baseUrl + 'me/profile/get';
  saveProfileUrl = this.baseUrl + 'me/profile/save';

  constructor(private router: Router,
              private http: Http) {
    this.token = localStorage.getItem('token');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  login(email: string, password: string) {
    const headers = new Headers(
      {
        'Content-Type': 'text/plain',
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache'
      });
    const data = {'username': email, 'password': password};

    this.http.post(this.loginUrl, data, {headers: headers})
      .subscribe((response: Response) => {
        const responseJson = response.json();
        this.token = responseJson['token'];
        localStorage.setItem('token', this.token);
        this.refreshToken = responseJson['refreshToken'];
        localStorage.setItem('refreshToken', this.refreshToken);
        this.username = responseJson['username'];
        console.log('Authenticated, tokens received');
        this.router.navigate(['']);
      });
  }

  getAccessTokenOrRefresh() {
    // Todo: run this check once in X minutes, not for every request
    this.http.get(this.verifyUrl, {headers: this.getTokenHeaders(this.token)}).subscribe(
      (response: Response) => {
        const responseJson = response.json();
        console.log(responseJson);
      }, (errorActiveToken: Response) => {
        const errorJson = errorActiveToken.json();
        if (errorJson['status'] === 401) {
          if (errorJson['message'] === 'Token has expired') {
            this.token = null;
            this.refreshAccessToken();
          }
        } else {
          console.log('unexpected error received, cannot authenticate');
          console.log(errorJson);
          this.token = null;
          this.refreshToken = null;
          return null;
        }
      }
    );
    return this.token;
  }

  logout() {
    this.token = null;
    this.refreshToken = null;
    localStorage.clear();
    this.router.navigate(['']);
    this.userLoggedOut.next(true);
  }

  facebookLogin(accessToken: string) {
    this.http.get(this.facebookLoginUrl, {headers: this.getFacebookTokenHeaders(accessToken)}).subscribe(
      (response: Response) => {
        const responseJson = response.json();
        console.log('Token exchanged successfully');
        console.log(accessToken);
        this.token = responseJson['token'];
        localStorage.setItem('token', this.token);
        this.refreshToken = responseJson['refreshToken'];
        localStorage.setItem('refreshToken', this.refreshToken);
        this.getUserProfile();
        this.router.navigate(['']);
      });
  }

  getUserData() {
    const token = this.getAccessTokenOrRefresh();
    this.http.get(this.fbDataUrl, {headers: this.getTokenHeaders(token)}).subscribe(
      (response: Response) => {
        this.facebookDataLoaded.next(response);
      }
    );
  }

  saveUserData(userData) {
    const headers = new Headers(
      {
        'X-Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
    const token = this.getAccessTokenOrRefresh();
    this.http.post(this.saveProfileUrl, JSON.stringify(userData), {headers: headers}).subscribe(
      (response: Response) => {
        console.log(response);
        console.log('Form submitted');
      }
    );
  }

  getUserProfile() {
    const token = this.getAccessTokenOrRefresh();
    this.http.get(this.getProfileUrl, {headers: this.getTokenHeaders(token)}).subscribe(
      (response: Response) => {
        const responseJson = response.json();
        const userData = new UserProfile(
          responseJson['first_name'],
          responseJson['last_name'],
          responseJson['username']);
        this.userProfileChanged.next(userData);
      }
    );
  }

  signupUser(email: string, password: string) {
    const headers = new Headers(
      {
        'Cache-Control': 'no-cache'
      });
    this.http.post(this.signUpUrl,
      {username: email, password: password},
      {headers: headers}).subscribe(
      (response: Response) => {
        console.log(response);
        this.router.navigate(['']);
      }
    );
  }

  isAuthenticated() {
    return this.token != null;
  }

  private refreshAccessToken() {
    if (this.refreshToken !== null) {
      console.log('token expired, requesting updated via refresh token');
      this.http.get(this.refreshUrl, this.getTokenHeaders(this.refreshToken)).subscribe(
        (response: Response) => {
          const refreshResponse = response.json();
          this.token = refreshResponse['token'];
          localStorage.setItem('token', this.token);
          console.log('token refreshed!');
        }, (error: Response) => {
          console.log(error.json());
          console.log('Refresh token expired, redirecting to login page');
          this.refreshToken = null;
          localStorage.clear();
          this.navigateToLogin();
        }
      );
    } else {
      this.navigateToLogin();
    }
  }

  private getTokenHeaders(token: string) {
    return new Headers({
      'X-Authorization': 'Bearer ' + token,
      'Cache-Control': 'no-cache'
    });
  }

  private getFacebookTokenHeaders(token: string) {
    return new Headers({
      'FB-Access-Token': 'Bearer ' + token,
      'Cache-Control': 'no-cache'
    });
  }

  private navigateToLogin() {
    this.router.navigate(['signin']);
  }

}