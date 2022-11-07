import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { stringify } from '@angular/compiler/src/util';
import { LandingRouteService } from './services/landingRoute/landing-route.service';
declare var StatusBar;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Family Engagement';
  isAuthenticateUser: boolean = true;
  constructor(private api: ApiService, private translate: TranslateService,private landingService: LandingRouteService) { }
  ngOnInit(): void {
    if(localStorage.getItem("loginExpiration")){
      let date = new Date(localStorage.getItem("loginExpiration"));
      if(date < new Date()) {
        this.api.services.oauth.clearSessionToken();
      }
    }
    this.initTranslate();
    document.addEventListener('deviceready', () => {
      this.api.services.mobile.setReady(true);
      this.api.services.mobile.detectDevicePlatform();
      StatusBar.styleDefault();
    }, true);
    this.landingService.redirectToLanding();

  }

  initTranslate() {
    let lang = this.translate.getBrowserCultureLang();
    if (lang.indexOf("es") != -1){
      this.translate.setDefaultLang('es-mx');
      moment.locale('es');
    }
    else{
      this.translate.setDefaultLang('en-us');
      moment.locale('en');
    }
  }
}
