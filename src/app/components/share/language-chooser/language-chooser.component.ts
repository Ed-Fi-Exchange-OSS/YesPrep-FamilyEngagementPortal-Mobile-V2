import { IBriefProfile } from './../../../models/IBriefProfile';
import { ApiService } from './../../../services/api.service';
import { AppConfig } from './../../../app.config';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'language-chooser',
  templateUrl: './language-chooser.component.html',
  styleUrls: ['./language-chooser.component.css']
})
export class LanguageChooserComponent implements OnInit {

  model: any = { currentLang: "" };
  briefProfile: IBriefProfile;
  @Input() dropDownAlign: string = "right";
  @Output() OnModelChange = new EventEmitter();
  constructor( private api: ApiService, private translate: TranslateService) {
    this.model = AppConfig.availableLanguages;
  }

  ngOnInit() {
    this.selectLocale(this.model.languages);
  }

  getCurrentLang() {
    let languageCode = '';
    if(this.briefProfile !== undefined) {
      languageCode = this.briefProfile.languageCode;
    }
    var lang = this.model.languages.filter((x) =>  { return x.lang == languageCode })[0];
    if (lang != null) {
      this.translate.use(lang.id);
      return this.parseCountry(lang.id);
    }
    return this.parseCountry(this.translate.getDefaultLang());
  }
  parseCountry(localeCode) {

    if (localeCode.length < 3) {
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
    this.translate.use(localeId);
    this.model.currentLang = this.parseCountry(localeId);
    for (let i = 0; i < this.model.languages.length; i++) {
      if (this.model.languages[i].flag == this.model.currentLang) {
        this.model.languages[i].active = true;
      } else {
        this.model.languages[i].active = false;
      }
    }
    this.onChange();
  }

  onChange() {
    this.OnModelChange.emit(true);
  }
}
