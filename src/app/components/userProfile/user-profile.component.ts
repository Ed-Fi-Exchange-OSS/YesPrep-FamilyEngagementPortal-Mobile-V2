import { Component, EventEmitter,NgZone, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { LandingRouteService } from 'src/app/services/landingRoute/landing-route.service';


@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  OnModelChange: EventEmitter<any> = new EventEmitter();
  model: any;
  methodOfContactTypes: any;
  languages: any;
  urls: any[] = [];
  resolvingPromise: boolean = false;
  constructor(private route: ActivatedRoute, 
              private api: ApiService, 
              private translate: TranslateService,
              private ngZone: NgZone,
              private toastr: ToastrService,
              private landingService: LandingRouteService,
              private router: Router) {
    this.translate.get('view.userProfile.title').subscribe(label => {
      this.api.services.share.emitTitleMenu(label);
    });
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.model = data.model;
      this.methodOfContactTypes = data.methodOfContactTypes;
      this.languages = data.languages;
    });

    this.api.services.landingRoutes.getRoute().then(route => {
      this.translate.get('Home').subscribe(label => {
        this.urls.push({ displayName: label, url: route });
      });
    });
    this.OnModelChange.subscribe( data => {
    });
  }

  uploadImage(fileInput: any) {
    let file = <File>fileInput.target.files[0];
    this.getBase64(file).then((data) => {
      this.model.imageUrl = data;
      let fd = new FormData();
      fd.append("file", file);
      this.api.services.me.uploadImage(fd).then((data) => {
        this.toastr.success('Information saved');
      })
    })
  }

  cleanUrlImage(url) {
    let img = url.replace('clientapp/', '');
    return img;
  }

  save(model) {
    this.changeLanguage(model.languageCode);
    let errorMessage="Please review ";
    let errorContact=false;
    let errorTelephone=false;
    if(model.preferredMethodOfContactTypeId==null || model.languageCode==null){
      errorContact=true;
    }

    model.telephoneNumbers.forEach(t => {
      if(t.telephoneNumber== null || t.telephoneNumberTypeId==null){
        errorTelephone=true;        
      }
    });
    
    if(errorContact && errorTelephone){
      errorMessage+="Your Portal Notifications and your Contact Information";
    }else if(errorContact){
      errorMessage+="Your Portal Notifications Section.";
    }else if(errorTelephone){
      errorMessage+="Your Contact Information";
    }

    if(!errorContact && !errorTelephone){
      this.api.services.me.saveMyProfile(model).then(data => { 
        alert("Information saved");     
        this.landingService.redirectToLanding();
      }).catch(error => {
        alert('Please review the info and try again');
      })
    }else{
      alert(errorMessage);
    }
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () { resolve(reader.result) };
      reader.onerror = function (error) { reject(error) };
    });
  }

  containerStyle() {
    if (this.api.services.mobile.device == 'Android') {
      return 'container-android-contacts';
    }
    return 'container-ios-contacts';
  }

  changeLanguage(code) {
    sessionStorage.setItem('language', code);
    this.api.services.share.emitUserProfileLanguageChange(code);
  }
}
