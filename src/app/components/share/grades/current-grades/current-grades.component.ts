import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './../../../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IBriefProfile } from 'src/app/models/IBriefProfile';
declare var cordova: any;
@Component({
  selector: 'current-grades',
  templateUrl: './current-grades.component.html',
  styleUrls: ['./current-grades.component.css']
})

export class CurrentGradesComponent implements OnInit {

  @Input() model: any;
  @Input() studentUsi: any;
  @Input() isTeacher: boolean;
  gradeThresholdTypes: any;
  role: string = "";
  profile:any;

  constructor(private api: ApiService, private route: Router, private translate: TranslateService) { 
    this.api.services.me.getRole().then((role: string) => {
      this.role = role;
    })
    this.api.services.me.getMyProfile().then((profile: any) => {
      this.profile = profile;
    })
  }

  ngOnInit() {
    this.gradeThresholdTypes = ['bad', 'warning'];
  }

  hasFinalGrade() {
    return this.model.currentCourses.some((c) => { c.gradesByFinal.length > 0 });
  }

  cleanUrlImage(url) {
    let img = url.replace('clientapp/', '');
    return img;
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
