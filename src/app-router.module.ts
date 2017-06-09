import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './app/home/home.component';
import {UserDataComponent} from "./app/user-data/user-data.component";
import {SignupComponent} from "./app/auth/signup/signup.component";
import {SigninComponent} from "app/auth/signin/signin.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full' },
  {path: 'sign-up', component: UserDataComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  // {path: 'login', component: AuthComponent, data: {message: 'login'} },
  // {path: 'logout', component: AuthComponent, data: {message: 'logout'}}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
