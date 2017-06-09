import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class VerifiedFieldComponent implements OnInit {
  @Input() label: string;
  @Input() suggestion: string;
  @Input() trailing: string;
  @Input() isRequired: boolean;

  constructor() { }

  ngOnInit() {
  }

}
