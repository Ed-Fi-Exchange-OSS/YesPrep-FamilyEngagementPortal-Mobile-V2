import { AppConfig } from './../../../../app.config';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { IBriefProfile } from 'src/app/models/IBriefProfile';
import { Router } from '@angular/router';

@Component({
  selector: 'language-select',
  templateUrl: './language-select-modal.component.html',
  styleUrls: ['./language-select-modal.component.css']
})
export class LanguageSelectModalComponent implements OnInit {
  languages: any;
  title: string = "";
  codeSelected: string = "";
  model: any = { currentLang: "" };
  data: any;
  briefProfile: IBriefProfile;

  @Output() onSelectedLanguage = new EventEmitter();
  constructor(private modalService: NgbModal,
    private api: ApiService,
    private translate: TranslateService,
    private ngZone: NgZone,
    private router: Router) {
    this.api.services.translate.getAvailableLanguages().then(data => {
      this.languages = data;
    });
    this.api.services.share.changeLanguageUserProfile.subscribe(code => {
      if(code != null){
        var language = this.model.languages.find((data) => { return data.lang == code });
        this.changeLocale(language.id);
        this.model.currentLang = this.getCurrentLang();
        this.codeSelected = language.lang
      }
    });
    this.model = AppConfig.availableLanguages;

    this.translate.get('Choose a language').subscribe(label => {
      this.title = label;
    });

    if (this.api.services.oauth.isAuthenticated() != null) {
      this.api.services.me.getMyBriefProfile().then((briefProfile: IBriefProfile) => {
        if(briefProfile.languageCode != null){
          this.briefProfile = briefProfile;
          var language = this.model.languages.find((data) => { return data.lang == this.briefProfile.languageCode });
          this.changeLocale(language.id);
          this.model.currentLang = this.getCurrentLang();
          this.codeSelected = language.lang
          if (sessionStorage.getItem('language') != null) {
            sessionStorage.setItem('language', this.codeSelected);
          }
        }
      });
    } else {
      let langDefault = 'en';
      if (sessionStorage.getItem('language') != null) {
        langDefault = sessionStorage.getItem('language')
      }
      var language = this.model.languages.find((data) => { return data.lang == langDefault; });
      this.codeSelected = language.lang
      this.changeLocale(language.id);
      if (sessionStorage.getItem('language') != null) {
        sessionStorage.setItem('language', this.codeSelected);
      }
      this.model.currentLang = this.getCurrentLang();
    }
    
    if(this.router.url=='/login' && localStorage.getItem('language-login')!=undefined){
      this.SelectLanguage(JSON.parse(localStorage.getItem('language-login')));
    }else if(this.router.url=='/login' && sessionStorage.getItem('language-login')!=undefined){
      localStorage.setItem('language-login',sessionStorage.getItem('language-login'));
      this.SelectLanguage(JSON.parse(localStorage.getItem('language-login')));
    }
    
  }

  ngOnInit() { }

  modalStyle() {
    if (this.api.services.mobile.device == 'iOS') {
      return 'language-margin-ios';
    }
    return '';
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  SelectLanguage(item) {
    var languageId = this.model.languages.find((data) => { return data.lang == item.code }).id;
    this.codeSelected = item.code;

    this.changeLocale(languageId);
    if (this.api.services.oauth.isAuthenticated() != null) {
      this.api.services.me.updateProfileLanguage({ languageCode: item.code });
    }
    sessionStorage.setItem('language', item.code); 
   
    if(this.router.url=='/login'){
      localStorage.setItem('language-login',JSON.stringify(item));
      sessionStorage.setItem('language-login',JSON.stringify(item));
    }
   
    this.onSelectedLanguage.emit(item);
   
  }

  getCurrentLang() {
    let languageCode = '';

    var lang = this.model.languages.filter((x) => { return x.lang == languageCode })[0];
    if (lang != null) {
      this.translate.use(lang.id);
      return this.parseCountry(lang.id);
    }
    return this.parseCountry(this.translate.getDefaultLang());
  }

  parseCountry(localeCode) {

    if (localeCode.length < 3) {
      return localeCode;
    }
    return localeCode.substr(3);
  }

  selectLocale(languages) {
    for (var i = 0; i < languages.length; i++) {
      if (this.translate.getDefaultLang() == languages[i].id) {
        languages[i].active = true;
      } else {
        languages[i].active = false;
      }
    }
  }

  changeLocale(localeId) {
    
    this.ngZone.run(() => {
      setTimeout(() => {
        this.translate.use(localeId);
      }, 100);
      this.model.currentLang = this.parseCountry(localeId);
      for (let i = 0; i < this.model.languages.length; i++) {
        if (this.model.languages[i].flag == this.model.currentLang) {
          this.model.languages[i].active = true;
        } else {
          this.model.languages[i].active = false;
        }
      }
    });
  }
}
