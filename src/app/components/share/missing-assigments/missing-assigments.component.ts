import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './../../../services/api.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
declare var cordova: any;
@Component({
  selector: 'missing-assigments',
  templateUrl: './missing-assigments.component.html',
  styleUrls: ['./missing-assigments.component.css']
})
export class MissingAssigmentsComponent {

  @Input() model: any;
  @Input() studentUsi: any;
  @Input() customParams: any;
  showAll: boolean = false;
  constructor(private api: ApiService, private route: Router, private translate: TranslateService) { }

  checkSectionDates(section) {
    return section.assignments.some(function (assignment) { assignment.daysLate <= 42 });
  }

  checkDate(days) {
    return days <= 42 // 6 weeks;
  }

  evalDaysLate(days) {

    var evaluation = null;
    // '.some()' is like foreach but you can break the loop by returning true.
    this.customParams.thresholdRules.some(function (rule) {
      if (eval(days + rule.operator + rule.value)) {
        evaluation = rule.evaluation;
        return true;
      }
    });

    // Transform evaluation to css class to use for view
    switch (evaluation) {
      case "excellent":
        return "success";
      case "good":
        return "primary";
      case "fair":
        return "warning";
      case "bad":
        return "danger";
      default:
        return "danger";
    }
  }

  externalUrl(url) {
    let browser = cordova.InAppBrowser.open(url, '_system', 'location=yes');
    this.translate.get("Family Portal").subscribe(label => {
      this.api.services.share.emitTitleMenu(label);
    })
    browser.on('exit').subscribe(() => {
      this.route.navigate(['layout', 'studentdetail', this.studentUsi]);
    });
  }

}
