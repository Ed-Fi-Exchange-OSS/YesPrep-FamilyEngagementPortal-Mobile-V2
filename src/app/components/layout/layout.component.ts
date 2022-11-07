import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isIOs: boolean = true;
  isSessionExpired: boolean = false;
  sessionExpiredLabel: string = 'Your session has expired. Please login again';
  openWizard:boolean = false;
  constructor(private api: ApiService, 
              private router: Router,
              private toastr: ToastrService, 
              private translate: TranslateService) {
    this.api.services.share.changeSessionExpired.subscribe(item => {
      this.isSessionExpired = false;
    });
    this.api.services.me.getMyBriefProfile().then((data: any) => {
      //alert("Contact: " + data.deliveryMethodOfContact +" Languaje: " + data.languageCode);
      if (data.deliveryMethodOfContact == null || data.languageCode == null){
          this.openWizard = true;
      }
    });
  }


  ngOnInit() {
    this.translate.get('Your session has expired. Please login again').subscribe(trans => {
      this.sessionExpiredLabel = trans;
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get('Your session has expired. Please login again').subscribe(trans => {
        this.sessionExpiredLabel = trans;
      });
    });

    this.api.services.alerts.changeAlertsIncoming.subscribe(data => {
      if(data.additionalData.studentUsi == undefined){
        this.toastr.info(data.message, data.title, {
          progressAnimation: 'increasing',
          disableTimeOut: true,
          closeButton: true
        });
      }
    });
  }

  containerStyle() {
    if (this.api.services.mobile.device == 'Android') {
      return 'container';
    }
    return 'container-ios';
  }

  clearSession() {
    this.api.services.oauth.clearSessionToken();
    this.router.navigate(['login']);
  }
}
