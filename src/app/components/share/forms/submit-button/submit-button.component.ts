import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent {

  @Input() form: NgForm;
  @Input() label: any;
  @Input() promiseToExecute: any;
  resolvingPromise: boolean = false;
  constructor() { }

  executePromise() {
    this.resolvingPromise = true;
    this.promiseToExecute().then(() => {
      this.resolvingPromise = false;
    })
  }

}
