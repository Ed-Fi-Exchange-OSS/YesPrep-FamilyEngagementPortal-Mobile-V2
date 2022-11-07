import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  model: any;
  urls: any = [];
  alert: any;
  resolvingPromise: boolean = false;
  constructor(private route: ActivatedRoute, 
              private api: ApiService, 
              private translate: TranslateService,
              private toastr: ToastrService) {
    this.translate.get('Configure User Alerts').subscribe(label => {
      this.api.services.share.emitTitleMenu(label);
    });
    
    this.route.data.subscribe((data) => {
      this.model = data.alerts;
    })
  }

  ngOnInit() {
    this.api.services.landingRoutes.getRoute().then(route => {
      this.urls.push({ displayName: 'Home', url: route });
    })
    this.alert = this.model.alerts.find((alert) =>  { return alert.alertTypeId == 1 });

    this.alert.thresholds = this.alert.thresholds.filter((threshold) => { return threshold.thresholdTypeId == 1 });
    this.alert.thresholds.find((threshold) => { return threshold.thresholdTypeId == 1 }).description = "ADA Absence Threshold";

  }

  save(model) {
    this.api.services.alerts.saveParentAlerts(model).then(data => {
         this.translate.get('Information saved').subscribe(label => {
           this.toastr.success(`${label}.`);
           this.resolvingPromise = true;
         });
       });
  }

  modelChange(id, data){
    this.model.alerts.find((a) => { return a.alertTypeId == id}).enabled = data;
  }

  containerStyle() {
    if (this.api.services.mobile.device == 'Android') {
      return 'container-android-contacts';
    }
    return 'container-ios-contacts';
  }
}
