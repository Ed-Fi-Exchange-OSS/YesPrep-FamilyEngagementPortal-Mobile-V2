import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'interpretation-icon',
  templateUrl: './interpretation-icon.component.html',
  styleUrls: ['./interpretation-icon.component.css']
})
export class InterpretationIconComponent implements OnInit {

  @Input() model: string;
  @Input() fontclass: any;
  @Input() tooltipText: string;
  @Input() types: any;
  constructor() { }

  ngOnInit() {
    if(!this.types)
      this.types = ['great', 'good', 'bad', 'warning', 'default'];
  }

}
