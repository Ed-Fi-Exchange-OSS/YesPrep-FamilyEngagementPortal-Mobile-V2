import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LandingRouteService } from 'src/app/services/landingRoute/landing-route.service';

declare var Fingerprint;
declare var cordova: any;
declare var device: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAndroid: boolean = true;
  appVersion: any;
  language: any;
 
  constructor(private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private landingService: LandingRouteService,
    private modalService: NgbModal) {
    this.route.data.subscribe((data) => {
      this.language = data;
    });
  }

  ngOnInit() {
    this.version();

    this.api.services.mobile.Ready.subscribe(ready => {
      if (ready) {
        if (device.platform == 'iOS') {
          this.isAndroid = false;
        }
      }
      // this.api.services.mobile.mobileVersionDevice().then(version => {
      //   this.appVersion = version;
      //   this.ngZone.run(() => this.appVersion = version);
       
      // });
    });
    if (device.platform == 'iOS') {
      this.isAndroid = false;
    }
  }

  version() {
    cordova.getAppVersion.getVersionNumber().then(version => {
      this.appVersion = version;
      this.ngZone.run(() => this.appVersion = version);
    });
  }

  loginSSO(modal) {
    this.api.services.oauth.logIn().then(res => {
      var apiAccess=this.api.services.logAccess;
      this.api.services.me.getMyProfile().then(function (profile: any) {
        apiAccess.save({
          email:profile.electronicMails[0].electronicMailAddress,
          usi:profile.usi,
          uniqueId:profile.uniqueId,
          personType:profile.personTypeId
        });
      });

      if (res === 'comming back from login flow') {
        this.landingService.redirectToLanding();
      }
    }).catch(err => {
      this.modalService.open(modal);
    });
  }
  signinWihApple() {
    this.api.services.oauth.logInWithApple().then(response => {
      if (response) {
        this.router.navigateByUrl('layout/landing');
      }
    }).catch(err => {
      this.router.navigateByUrl('experienceUser');
      //this.toastr.error('Credentials did not match any parent or teacher.');
    });
  }
  logOutSSO() {
    this.api.services.oauth.logOut();
  }

  loginBiometric() {
    Fingerprint.isAvailable((result) => {
      Fingerprint.show({
        title: "Login to Family Engagement"
      }, () => {
        this.api.services.oauth.biometricLogIn().then(logIn => {
          if (logIn) {
            this.ngZone.run(() =>  this.landingService.redirectToLanding());
          }
        }).catch(() => alert("Oops! Something went wrong."));
      }, error => {
        //console.log("Authentication invalid " + error.message);
      });
    }, (error) => {
      alert(error.message);
    });
  }

  IsFirstLogin() {
    return localStorage.getItem('refresh_token') != null;
  }

  privacyPolicy() {
    cordova.InAppBrowser.open('https://familyportal.yesprep.org/#/privacypolicy', '_blank', 'location=no,clearcache=yes,zoom=no');
  }

  goToExternalUrl() {
    cordova.InAppBrowser.open('https://www.yesprep.org/parents/family-dashboards/portal-help', '_blank', 'location=no,clearcache=yes,zoom=no');
  }
}
