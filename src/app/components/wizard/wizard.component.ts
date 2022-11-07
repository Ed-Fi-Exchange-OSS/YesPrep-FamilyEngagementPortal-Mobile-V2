import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from 'src/app/app.config';

import { ApiService } from './../../services/api.service';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  wizardFromGroup: FormGroup;
  model: any = {};
  languages: any;
  methodOfContactTypes: any;
  selectTelephone: boolean = false;
  inputNewTelephoneShow: boolean = false;
  inputEmailShow: boolean = false;
  textMessageCarrierTypes: any;
  public primaryEmail: string = '';
  
  @Output() onFinishWizard = new EventEmitter();
  profile: any;
  constructor(private _formBuilder: FormBuilder,
              private api: ApiService,
              private translate: TranslateService,
              private ngZone: NgZone) {
    api.services.translate.getAvailableLanguages().then(data => {
      this.languages = data;
    });
    api.services.types.getMethodOfContactTypes().then(data => {
      this.methodOfContactTypes = data;
    });
    this.model = AppConfig.availableLanguages;
    api.services.me.getMyProfile().then((data: any) => {
      this.profile = data;
      const configuredEmail = this.profile.electronicMails[0];
      this.primaryEmail = configuredEmail ? configuredEmail.electronicMailAddress : '';
      if(this.wizardFromGroup){
        this.wizardFromGroup.controls['emailNew'].setValue(this.primaryEmail);
      }
    });
    api.services.types.getTextMessageCarrierTypes().then(data => {
      this.textMessageCarrierTypes = data;
    });
  }

  ngOnInit(): void {
    this.wizardFromGroup = this._formBuilder.group({
      languageSel: ['', Validators.required],
      methodOfContact: ['', Validators.required],
      telephoneNew: [''],
      emailNew: [''],
      telephoneSelect: [''],
      telephoneCarrier: ['']
    });
    this.wizardFromGroup.controls['emailNew'].setValue(this.primaryEmail);
  }

  methodOfContactChange(data) {
    if (data == 2) {
      let isSMSTelephone = this.profile.telephoneNumbers.find((t) => { return t.telephoneNumberTypeId == 2214 && t.textMessageCapabilityIndicator == true});
      if(isSMSTelephone != null){
        this.selectTelephone = true;
      } else {
        this.inputNewTelephoneShow = true;
      }
      this.inputEmailShow = false;
    }
    else if (data == 1) {
      this.inputEmailShow = true;
      this.selectTelephone = false;
      this.inputNewTelephoneShow = false;
    }
    else {
      this.inputEmailShow = false;
      this.selectTelephone = false;
      this.inputNewTelephoneShow = false;
    }
  }

  telephoneChange(telephone) {
    if (telephone == 'NewPhone'){
      this.inputNewTelephoneShow = true;
    } else {
      this.profile.telephoneNumbers.forEach(t => {
         if(t.telephoneNumber == telephone) {
          this.inputNewTelephoneShow = false;
          t.primaryMethodOfContact = true;
          t.textMessageCapabilityIndicator = true;
         }
      });
    }
  }

  getLanguage(code){
    if(code != ""){
      let language = this.languages.find((data) => { return data.code == code });
      return  language.nativeName +' - '+ language.name;
    }
  }

  getMethodOfContact(mc){
    if(mc != "") {
      let moc = this.methodOfContactTypes.find(data => { return data.methodOfContactTypeId == mc });
      return moc.shortDescription;
    }
  }

  doneWiz () {
    this.profile.preferredMethodOfContactTypeId = this.wizardFromGroup.value.methodOfContact;
    this.profile.languageCode = this.wizardFromGroup.value.languageSel;
    if(this.wizardFromGroup.value.methodOfContact == 2 && this.inputNewTelephoneShow) {
      this.profile.telephoneNumbers.forEach(t => {
        if (t.telephoneNumberTypeId == 2214) {
          t.telephoneNumberTypeId = 2215;
        }
        t.primaryMethodOfContact = false;
        t.textMessageCapabilityIndicator = false;
      });

      this.profile.telephoneNumbers.push({
        primaryMethodOfContact: true,
        smsDomain: null,
        telephoneCarrierTypeId: this.wizardFromGroup.value.telephoneCarrier,
        telephoneNumber: this.wizardFromGroup.value.telephoneNew,
        telephoneNumberTypeId: 2202,//2214,
        textMessageCapabilityIndicator: true,
      })
    }
    this.api.services.me.saveMyProfile(this.profile).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
    this.onFinishWizard.emit(false);
  }

  doneWithOutFinish() {
    this.onFinishWizard.emit(false);
  }

  SelectLanguage(item) {
    var languageId = this.model.languages.find((data) => { return data.lang == item.code }).id;

    this.changeLocale(languageId);
    if (this.api.services.oauth.isAuthenticated() != null) {
      this.api.services.me.updateProfileLanguage({ languageCode: item.code });
    }
    sessionStorage.setItem('language', item.code);
    this.api.services.share.emitLanguageSelected(item);
  }

  changeLocale(localeId) {
    this.ngZone.run(() => {
      setTimeout(() => {
        this.translate.use(localeId);
      }, 100);
    });

  }

}
