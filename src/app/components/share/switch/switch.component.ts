import { Component, Input, Output, EventEmitter } from '@angular/core';
;

@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent {

  @Input() id: any;
  @Input() label: any;
  @Input() model: any;
  @Output() OnModelChange = new EventEmitter();

  constructor() { }

  onSwitch () {
    this.OnModelChange.emit(this.model);
  }

}
