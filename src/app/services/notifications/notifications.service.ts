import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';

declare var PushNotification;
declare var device;
@Injectable()
export class NotificationsService {

  private rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  private apiResourceUri: string = `${this.rootApiUri}/notifications`;

  constructor(private service: ApiService, private http: HttpClient) { }

  startService(): void {
    let push = PushNotification.init({
      android: { 
        senderID: environment.google.notifications.senderId,
        icon: "ic_yes_prep",
        clearBadge:"true"
      },
      ios: {
        alert: true,
        badge: true,
        sound: true
      }
    });

    push.on('registration', (data) => {
      let oldRegId = localStorage.getItem('registrationId');
      if (oldRegId !== data.registrationId) {
        // Save new registration ID
        localStorage.setItem('registrationId', data.registrationId);
        // Post registrationId to your app server as the value has changed
        this.setRegistrationId({ 
          personUniqueId: this.service.services.common.getShareModel().uniqueId, 
          token: data.registrationId, 
          personType:  this.service.services.common.getShareModel().role,
          deviceUuid: device.uuid 
        });
      }
    });

    push.on('notification', (data) => {
      this.service.services.alerts.emitAlertNotification(data);
    });

  }

  setRegistrationId(entity) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/setIdentifier`, entity).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      })
    });
  }
}
