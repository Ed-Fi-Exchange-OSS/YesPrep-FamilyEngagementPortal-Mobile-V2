import { ApiService } from './../../../../services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alerts-modal',
  templateUrl: './alerts-modal.component.html',
  styleUrls: ['./alerts-modal.component.css']
})
export class AlertsModalComponent implements OnInit {
  title: string;
  alerts: any[] = [];
  @Input() model: any;

  constructor(private modalService: NgbModal, private translate: TranslateService, private api: ApiService) { }

  ngOnInit() {
    this.api.services.alerts.changeAlertsIncoming.subscribe(data => {
      if (data.additionalData.studentUsi == undefined) {
        this.api.services.alerts.getUnreadAlerts(this.model.studentUniqueId).then(data => {
          this.model.alerts = data
        });
      }
    });
  }

  openScrollableContent(modalId) {
    this.translate.get('General Alerts').subscribe(label => {
      this.title = `${label}`;
    });
    this.modalService.open(modalId, {
      scrollable: true,
      centered: true,
      backdrop: 'static',
      keyboard: false });
    this.fillData();
  }

  readAlerts() {
    this.api.services.alerts.parentHasReadStudentAlerts(this.model.studentUniqueId).then(() => {
      this.model.alerts = [];
      this.alerts = [];
    })
  }

  fillData() {
    this.model.alerts.forEach(element => {
      if (element.alertTypeName == 'Absence') {
        this.translate.get('Alert Absences Exceeded').subscribe(label => {
          this.translate.get('new absences').subscribe(value => {
            this.alerts.push({
              title: label,
              value: `${element.value} ${value}`
            });
          });
        });
      }
      if (element.alertTypeName == 'Course Grade') {
        this.translate.get('Alert Course Exceeded').subscribe(label => {
          this.translate.get('grades below threshold').subscribe(value => {
            this.alerts.push({
              title: label,
              value: `${element.value} ${value}`
            });
          });
        });
      }
      if (element.alertTypeName == 'Behavior') {
        this.translate.get('Alert Behavior Exceeded').subscribe(label => {
          this.translate.get('new behavior incident').subscribe(value => {
            this.alerts.push({
              title: label,
              value: `${element.value} ${value}`
            });
          });
        });
      }
    });
  }
}
