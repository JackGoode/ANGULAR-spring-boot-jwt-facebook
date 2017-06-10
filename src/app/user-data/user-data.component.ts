import {Component, OnInit} from "@angular/core";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {DataService} from "../shared/data.service";
import {AuthService} from "../auth/auth.service";
import {FacebookUserData} from "../shared/facebook-user-data.model";
import {UserData} from "./user-data.model";
import {UserService} from "./user.service";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  form: FormGroup;
  entry: UserData;

  constructor(private userService: UserService,
              private authService: AuthService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.entry = new UserData;
    this.createForm();
  }

  onSubmit() {
    this.authService.saveUserData(this.form.value);
  }

  onPrefill() {
    if (this.dataService.userData === undefined || this.dataService.userData === null) {
      this.authService.getUserData();
      this.authService.facebookDataLoaded.subscribe(() => {
        this.setFormData(this.dataService.getUserData());
      });
    } else {
      this.setFormData(this.dataService.getUserData());
    }
  }

  onClear() {
    this.purgeFormArray('workList');
    this.purgeFormArray('educationList');
    this.form.reset();
  }

  onWorkItemAdded() {
    (<FormArray>this.form.get('workList')).push(new FormGroup({
      'company': new FormControl(null),
      'position': new FormControl(null),
      'startDate': new FormControl(null),
      'endDate': new FormControl(null)
    }));
  }

  onEducationItemAdded() {
    (<FormArray>this.form.get('educationList')).push(new FormGroup({
      'institution': new FormControl(),
      'speciality': new FormControl(),
      'year': new FormControl()
    }));

  }

  onItemDeleted(arrayName, index) {
    const formArray = (<FormArray>this.form.get(arrayName));
    if (formArray.length > 1) {
      formArray.removeAt(index);
    } else {
      formArray.at(index).reset();
    }
  }

  private createForm() {

    this.entry.educationList = new FormArray([new FormGroup({
      'institution': new FormControl(null),
      'speciality': new FormControl(null),
      'year': new FormControl(null)
    })]);
    this.entry.workList = new FormArray([new FormGroup({
      'company': new FormControl(null),
      'position': new FormControl(null),
      'startDate': new FormControl(null),
      'endDate': new FormControl(null)
    })]);

    this.form = new FormGroup({
      'first_name': new FormControl(this.entry.first_name),
      'last_name': new FormControl(this.entry.last_name),
      'email': new FormControl(this.entry.email),
      'country': new FormControl(this.entry.country),
      'city': new FormControl(this.entry.city),
      'educationList': this.entry.educationList,
      'workList': this.entry.workList,
    });
  }

  private purgeFormArray(arrayName) {
    const array = (<FormArray>this.form.get(arrayName));
    while (array.length !== 1) {
      array.removeAt(array.length - 1);
    }
  }

  private setFormData(userData: FacebookUserData) {
    for (let _i = 0; _i < userData.workList.length; _i++) {
      const work = userData.workList[_i];

      if (_i > 0) {
        this.entry.workList.push(
          new FormGroup({
            'company': new FormControl(),
            'position': new FormControl(),
            'startDate': new FormControl(),
            'endDate': new FormControl()
          }));
      }

      this.entry.workList.at(_i).patchValue({
        'company': work['employer']['name'],
        'position': work['position']['name'],
        'startDate': work['start_date'] ? work['start_date'].substr(0, 4) : '',
        'endDate': work['end_date'] ? work['end_date'].substr(0, 4) : ''
      });
    }

    for (let _i = 0; _i < userData.educationList.length; _i++) {
      const education = userData.educationList[_i];

      if (_i > 0) {
        this.entry.educationList.push(
          new FormGroup({
            'institution': new FormControl(),
            'speciality': new FormControl(),
            'year': new FormControl()
          }));
      }

      this.entry.educationList.at(_i).patchValue({
        'institution': education['school']['name'],
        'speciality': education['concentration'].length === 0 ? 'N/A' : education['concentration'][0]['name'],
        'year': education['year']['name']
      });
    }

    this.form.patchValue({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      country: userData.location['country'],
      city: userData.location['city']
    });
    console.log('values patched');
  }

}
