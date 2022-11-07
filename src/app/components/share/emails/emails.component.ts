import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

  @Input() model: any;
  @Output() OnModelChange = new EventEmitter();
  
  electronicMailTypes: any;
  

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.services.types.getElectronicMailTypes().then(data => {
      this.electronicMailTypes = data;
    })
  }

  delete(index) {
    this.model.splice(index, 1);
  }

  add() {
    let template = { electronicMailAddress: null, electronicMailTypeId: 1, primaryEmailAddressIndicator: null };
    this.model.push(template);
  }

  choosePrimaryMail(mail) {
    this.model.forEach(function (mail) { mail.primaryEmailAddressIndicator = false; });
    mail.primaryEmailAddressIndicator = true;
  }
  
  onChange() {
    this.OnModelChange.emit(this.model);
  }
}
