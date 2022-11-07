import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import { Component, Input } from '@angular/core';
declare var cordova: any;
@Component({
  selector: 'discipline-incidents',
  templateUrl: './discipline-incidents.component.html',
  styleUrls: ['./discipline-incidents.component.css']
})
export class DisciplineIncidentsComponent {

  @Input() model: any;
  @Input() studentUsi: string;

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
