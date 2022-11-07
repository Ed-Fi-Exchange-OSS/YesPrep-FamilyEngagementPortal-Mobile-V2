import { Component, Input } from '@angular/core';

@Component({
  selector: 'indicator2',
  templateUrl: './indicator2.component.html',
  styleUrls: ['./indicator2.component.css']
})
export class Indicator2Component {

  @Input() interpretation: any;
  @Input() tooltip: any;
  @Input() indicatorTitle: any;
  @Input() value: any;
  @Input() textualEvaluation: any;
  @Input() bgclass: string;
  @Input() showLoader: boolean;

  constructor() {}
}
