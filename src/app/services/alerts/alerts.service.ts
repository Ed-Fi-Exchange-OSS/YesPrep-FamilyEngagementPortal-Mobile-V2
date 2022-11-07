import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AlertsService {
  private emitAlertsIncomming = new Subject<any>();
  public changeAlertsIncoming = this.emitAlertsIncomming.asObservable();
  rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  apiResourceUri: string = `${this.rootApiUri}/alerts`;
  constructor(private http: HttpClient) { }

  getParentAlerts() {
    return new Promise((resolve, reject) => {
      this.http.get( `${this.apiResourceUri}/parent`).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  saveParentAlerts(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/parent`,model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }

  parentHasReadStudentAlerts(studentUniqueId) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/parent/${studentUniqueId}`).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    })
  }

  emitAlertNotification(change: any) {
    this.emitAlertsIncomming.next(change);
  }

  getUnreadAlerts(studentUniqueId) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/parent/unread/${studentUniqueId}`).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
}
