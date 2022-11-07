import { NotificationsService } from './../../services/notifications/notifications.service';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, HostListener, ElementRef, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IBriefProfile } from 'src/app/models/IBriefProfile';
import { filter } from 'rxjs/operators';
import { Location } from "@angular/common";
import { LandingRouteService } from 'src/app/services/landingRoute/landing-route.service';
declare var device: any;
declare var cordova: any;

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  recipientUnreadMessages: any = {
    unreadMessagesCount: 0,
  };
  model = {
    user: {
      name: "",
      email: ""
    },
    urls: []
  }
  uniqueId: string = "";
  name: string = "";
  role: string = "";
  externalUrl: string = "";
  navBarTitle: string;
  opened: boolean = false;
  titleNavbar: string = "Family Portal";
  showBackButton: boolean = false;
  showIconImage: boolean = false;
  studentName: string = ""
  urlFrom: string;
  urlTo: any;
  navbarOpen: boolean = false;
  settingsOpen: boolean = false;
  imageChat: string = ''
  count: number = 0;
  language: any;
  isIOS: boolean = true;
  isLanding: boolean = false;
  landingStyle: string = '';
  languajeSelected:string;
  constructor(private api: ApiService,
    private translate: TranslateService,
    private router: Router,
    private location: Location,
    private notificationService: NotificationsService,
    private landingService: LandingRouteService,
    private eRef: ElementRef,
    private ngZone: NgZone) {
      
    this.api.services.share.changeBackButtonEmitted.subscribe(backButton => {
      this.showBackButton = backButton.change;
      this.urlFrom = backButton.urlFrom;
      this.urlTo = backButton.urlTo;

    });
    this.api.services.share.changeTitleMenuEmitted.subscribe((studentName: any) => {
      this.titleNavbar = studentName;
      this.studentName = studentName;
    });
    this.api.services.share.changeNavBarEmitted.subscribe(chatNavBar => {
      this.showIconImage = chatNavBar.showIconImage;
      this.imageChat = chatNavBar.image;
      this.studentName = chatNavBar.studentName;
    });

    this.api.services.share.changeLanguageData.subscribe(data => {
      this.language = data;
    });

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.backButtonNavBarActive(e);
      e.url = this.location.path();
      if (!e.url.includes('/convertation')) {
        this.showIconImage = false;        
      }
      if(e.url.includes('landing') || e.url.includes('layout')) {
        this.isLanding = true;
        if(this.isLanding) {
          this.landingStyle = 'navbar-landing';
          if (!e.url.includes('/convertation')) {
            this.translate.get("Family Portal").subscribe(label => {
              this.titleNavbar = label;
            });
          }else{
            this.titleNavbar='Communications';
          }
        }
      } else {
        this.landingStyle = '';
      }
    });

    this.api.services.me.getMyBriefProfile().then((data: IBriefProfile) => {
      this.uniqueId = data.uniqueId;
      this.name = data.name;
      this.role = data.role;
      this.api.services.common.setShareModel({ uniqueId: data.uniqueId, role: data.role });
      this.api.services.communications.startChatEngine();
      this.notificationService.startService();
    }).catch(err => {
      console.log(err);
      this.api.services.share.emitSessionExpired(true);
    });

    this.api.services.mobile.Ready.subscribe(ready => {
      if (ready) {
        if (device.platform == 'iOS') {
          this.isIOS = true;
        }
      }
    });

    if (this.api.services.mobile.device == 'Android') {
      this.isIOS = false;
    }

    /** When the application is open for first time need to call the unread messages status */
    this.api.services.communications.messageReceived.subscribe(() => {
      this.ngZone.run(() => this.unreadMessages());
    });

    /** When the application receive a message for the chat the observable need do refresh the unread message count*/
    this.api.services.landingRoutes.getRoute().then(route => {
      this.translate.get('Home').subscribe(data => {
        this.model.urls.push({ displayName: data, url: route, icon: 'ion-md-home' });
      });
    });

    this.api.services.share.changeUnreadMessages.subscribe(() =>  {
      this.ngZone.run(() => this.unreadMessages());
    });
    this.translate.onLangChange.subscribe(() => {
      if(this.isLanding) {
        this.translate.get("Family Portal").subscribe(label => {
          this.titleNavbar = label;
        });
      }
    });
    this.unreadMessages();
  }

  backButtonNavBarActive(event) {
    this.navbarOpen = false;
   // alert(event.url );
    if (event.url == '/' || event.url == '/layout/landing' || event.url == '/layout/teacher' || event.url == '/layout/campusleader' ) {
      this.showBackButton = false;
    } else {
      this.count++;
      this.showBackButton = true;
    }

  }

  goToExternalUrl() {
    cordova.InAppBrowser.open('https://www.yesprep.org/parents/family-dashboards/portal-help', '_blank', 'location=no,clearcache=yes,zoom=no');
  }

  logOutSSO() {
    this.api.services.oauth.logOut().then(result => {
      if (result)
      {
        this.api.services.mobile.Ready.subscribe(ready => {
          if (ready) {
            if (device.platform == 'iOS') {
              this.isIOS = true;
            }
          }
        });
        this.router.navigate(['login']);
      }
    });
  }

  backEvent() {
    this.translate.get("Family Portal").subscribe(label => {
      this.titleNavbar = label;
    });

    if (this.router.url.match('studentdetail')) {
      this.landingService.redirectToLanding();
     //window.history.back();
    } else if (this.router.url != '/layout/landing') {
      window.history.back();
    }
  }

  activeBackButton(url) {
    this.api.services.share.emitBackButton(true, url);
  }

  onEvent(event) {
    event.stopPropagation();
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  togglerSettings() {
    this.settingsOpen = !this.settingsOpen;
  }

  onSelectedLanguage(data) {
    this.api.services.share.emitLanguageSelected(data);
  }

  changeNameHome() {
    this.model.urls.find(x => {
      if (x.url == "/landing") {
        this.translate.get('Home').subscribe(data => {
          x.displayName = data;

        });
      }
    });
  }

  privacyPolicy() {
    cordova.InAppBrowser.open('https://familyportal.yesprep.org/#/privacypolicy', '_blank', 'location=no,clearcache=yes,zoom=no');
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target) && this.navbarOpen) {
      this.toggleNavbar();
    }
  }

  private unreadMessages() {
    this.api.services.communications.recipientUnread().then(data => {
      this.recipientUnreadMessages = data;
    }).catch(error => console.log("error in reacipientUnread" + error));
  }
}
