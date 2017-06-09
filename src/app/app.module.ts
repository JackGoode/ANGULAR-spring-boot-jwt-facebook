import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {VerifiedFieldComponent} from "./user-data/text-input/text-input.component";
import {VerifiedInputCheckboxesComponent} from "./user-data/checkbox-input/checkbox-input.component";
import {FooterComponent} from "./footer/footer.component";
import {AppRoutingModule} from "../app-router.module";
import {HomeComponent} from "./home/home.component";
import {DropdownDirective} from "./shared/dropdown.directive";
import {AuthService} from "./auth/auth.service";
import {FacebookService} from "ng2-facebook-sdk";
import {SigninComponent} from "./auth/signin/signin.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {DataService} from "./shared/data.service";
import {UserDataComponent} from "./user-data/user-data.component";
import {UserService} from "./user-data/user.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserDataComponent,
    VerifiedFieldComponent,
    VerifiedInputCheckboxesComponent,
    FooterComponent,
    HomeComponent,
    DropdownDirective,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    UserService,
    FacebookService,
    DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
