import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './../../../services/api.service';
import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
declare var cordova: any;

@Component({
  selector: 'student-staar-assessment',
  templateUrl: './student-staar-assessment.component.html',
  styleUrls: ['./student-staar-assessment.component.css']
})
export class StudentStaarAssessmentComponent {

  
  @Input() model: any;
  @Input() assessment: number;
  @Input() color : string;
  @Input() studentUsi: any;
  constructor(private api: ApiService, private route: Router, private translate: TranslateService) { }

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
