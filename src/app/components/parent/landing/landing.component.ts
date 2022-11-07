import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var cordova: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isAndroid: boolean = true;
  student: any[] = [];
  newVersion: boolean = false;
  params: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.isAndroid = sessionStorage.getItem('device') == 'Android';
    this.route.data.subscribe(params => {
      this.params = params.customParams;
    });
  }

  ngOnInit() {
    this.api.services.parents.getStudents()
      .then((data: any[]) => {
        this.student = data;
        this.api.services.students.setStudentIds(data.map((x) => { return x.studentUsi; }));
      })
      .catch((error) => console.log("Error in Landing" + JSON.stringify(error)));
    
    this.api.services.mobile.mobileVersion().then((mobileApiVersion: string) => {      
      this.api.services.mobile.mobileVersionDevice().then((mobileVersion: string) => {        
        let mav =  mobileApiVersion.split('.').map(Number);  
        let mv =  mobileVersion.split('.').map(Number);    
        
        if(mav[0]>mv[0]){
          this.newVersion = true;
        }else if(mav[0]=mv[0]){
          if(mav[1]>mv[1]){
            this.newVersion = true;
          }else if(mav[1]=mv[1]){
            if(mav[2]>mv[2]){
              this.newVersion = true;
            }
          }
        }
        /* if (mobileApiVersion > mobileVersion) {
          this.newVersion = true;
        }*/
      });
    });

    if (sessionStorage.getItem('language') != null) {
      this.api.services.me.updateProfileLanguage({ languageCode: sessionStorage.getItem('language') });
    }
  }

  public redirectToStore() {
    if (this.isAndroid) {
      cordova.InAppBrowser.open(environment.storesUrls.android, '_system', 'location=yes');
    } else {
      cordova.InAppBrowser.open(environment.storesUrls.ios, '_system', 'location=yes');
    }
  }
}
