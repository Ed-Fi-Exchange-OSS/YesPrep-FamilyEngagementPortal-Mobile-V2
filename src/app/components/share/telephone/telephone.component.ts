import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITelephone } from 'src/app/models/Telephone';
import { ITelephoneType } from 'src/app/models/telephoneType';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmationService } from 'src/app/services/confirmation/confirmation.service';

@Component({
  selector: 'telephone',
  templateUrl: './telephone.component.html',
  styleUrls: ['./telephone.component.css']
})
export class TelephoneComponent implements OnInit {

  @Input() model: Array<ITelephone> = new Array<ITelephone>();
  showDelete:boolean=false;
  @Output() OnModelChange = new EventEmitter();
  telephoneTypes: Array<ITelephoneType> = new Array<ITelephoneType>();
  textMessageCarrierTypes: any;
  onSelectChange: boolean = false;

  onDelete = new EventEmitter();

  constructor(
    private api: ApiService, 
    private _cd: ChangeDetectorRef, 
    private _confirmation: ConfirmationService) { }

  ngOnInit() {
    this.api.services.types.getTelephoneNumberTypes().then((data: any) => {
      var home = data.find(data => { return data.telephoneNumberTypeId == 2213; });
      if (home) {
        home.shortDescription = 'Home_telephone';
      }
      this.telephoneTypes = data;
      this.detectChanges();
    });

    this.api.services.types.getTextMessageCarrierTypes().then(data => {
      this.textMessageCarrierTypes = data;
      this.detectChanges();
    });
    this.model.forEach( item => item.editable = false );
    this.showDelete = this.model.length > 1 ? true:false;
    this.onDelete.subscribe( data => {
      this.detectChanges();
    });
    this._confirmation.getBehaviorSubject().subscribe( data => {
      this.showDelete = this.model.length > 1 ? true:false;
    });
  }

  choosePrimaryeTelephone(telephone) {
    this.model.forEach(function (telephone) { telephone.primaryMethodOfContact = false; });
    telephone.primaryMethodOfContact = true;
    this.detectChanges();
  }

  add(){
    var template = { 
      telephoneNumber: null, 
      telephoneNumberTypeId: null, 
      primaryMethodOfContact: null, 
      textMessageCapabilityIndicator:null,
      editable: true 
  }  as ITelephone;
    this.model.push(template);
    this.showDelete = true;
    this.detectChanges();
  }

  onChange() {
    this.onSelectChange = true;
    this.OnModelChange.emit(this.model);
    this.showDelete = this.model.length > 1 ? true:false;
    this.detectChanges();
  }
  delete(index) {
    //this.model.splice(index, 1);
    this.showDelete = this.model.length > 1 ? true:false;
  }
  public get shouldShowDeleteButton() {
    return this.showDelete;
  }
  public executeAfterDelete(){
    this.showDelete = this.model.length > 1 ? true:false;
    this.detectChanges();
  }

  hasValue(value) {
    return value !== null ? true : false;
  }
  private detectChanges(): void {
    this.OnModelChange.emit(this);
    setTimeout(()=> {
      this._cd.markForCheck();
      this._cd.detectChanges();
    },100);
  }
}
