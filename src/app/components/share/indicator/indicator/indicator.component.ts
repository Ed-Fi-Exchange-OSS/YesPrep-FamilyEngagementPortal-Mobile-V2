import { Component, Input } from '@angular/core';

@Component({
  selector: 'indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent {

  @Input() indicatorTitle: any;
  @Input() tooltip: any;
  @Input() value: any;
  @Input() textualEvaluation: any;
  @Input() bgclass: string;
  @Input() showLoader: boolean;
  constructor() {
   }
}
