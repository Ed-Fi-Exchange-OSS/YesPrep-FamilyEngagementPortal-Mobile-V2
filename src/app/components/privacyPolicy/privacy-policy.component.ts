import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private api: ApiService) {
   }

  ngOnInit() {
    this.api.services.share.emitBackButton(true,'');
  }

  goBack() {
    window.history.back();
  };

}
