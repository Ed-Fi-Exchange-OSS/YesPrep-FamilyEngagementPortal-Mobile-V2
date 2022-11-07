import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  @Input() model: any;
  @Output() OnModelChange = new EventEmitter();
  
  addressTypes: any;
  stateAbbreviationTypes: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.services.types.getAddressTypes().then((data: any) => {
      var home = data.find(data => { return data.addressTypeId == 89; });
      home.shortDescription = 'Home_telephone';
      this.addressTypes = data;
    });
    this.api.services.types.getStateAbbreviationTypes().then(data => {
      this.stateAbbreviationTypes = data;
    })
  }

  delete(index) {
     this.model.splice(index, 1); 
  };

  add() {
    var template = {
      streetNumberName: null,
      apartmentRoomSuiteNumber: null,
      addressTypeId: 1,
      city: null,
      stateAbbreviationTypeId: 1,
      postalCode: null
    };
    this.model.push(template);
  }

  onChange() {
    this.OnModelChange.emit(this.model);
  }
}
