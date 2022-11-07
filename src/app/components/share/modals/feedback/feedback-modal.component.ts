import { ApiService } from './../../../../services/api.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.css']
})
export class FeedbackModalComponent {
  
  @Output() onModelChange = new EventEmitter();

  model = {
    issue: "",
    subject: "",
    description: "",
    name: "",
    email: "",
    feedback: true
  }
  constructor(private modalService: NgbModal, 
              private router: Router, 
              private api: ApiService, 
              private toastr: ToastrService,
              private translate: TranslateService) { }

  openModal(feedback) {
    this.modalService.open(feedback);
  }
  delete(index) {
    this.onModelChange.emit(this.model);
  }
  onLoginScreen() {
    return this.router.url.indexOf('login') != -1;
  }

  containerStyle() {
    if (this.api.services.mobile.device == 'Android') {
      return '0px';
    }
    return '50px';
  }

  persistFeedback() {
    const modeltoSend = {
      issue: this.model.issue,
      subject: this.model.subject,
      description: this.model.description,
      name: this.model.name,
      email: this.model.email,
      currentUrl: this.router.url,
      isFromLoginScreen: this.onLoginScreen()
    };

    if(modeltoSend.isFromLoginScreen) {
      this.api.services.feedback.persist(modeltoSend).then(result => {
        
        this.translate.get('We have successfully received your feedback').subscribe(label => {
          this.toastr.success(label);
          this.model = {
            issue: "",
            subject: "",
            description: "",
            name: "",
            email: "",
            feedback: true
          }
         });

      });
    } else {
      this.api.services.feedback.persistLogged(modeltoSend).then(result => {
        this.translate.get('We have successfully received your feedback').subscribe(label => {
          this.toastr.success(label);
          this.model = {
            issue: "",
            subject: "",
            description: "",
            name: "",
            email: "",
            feedback: true
          }
         });
      });
    }    
  }
}
