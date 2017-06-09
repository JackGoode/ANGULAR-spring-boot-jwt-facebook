import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css']
})
export class VerifiedInputCheckboxesComponent implements OnInit {
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
