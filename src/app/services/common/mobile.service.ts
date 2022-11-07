import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare var cordova: any;
@Injectable()
export class MobileService {
  private isReady = new Subject<boolean>();
  public Ready = this.isReady.asObservable();
  private _ready: boolean = false;

  private rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  private apiResourceUri: string = `${this.rootApiUri}/mobile`;
  constructor(private http: HttpClient) {

    
   }

  detectDevicePlatform() {
    let device = '';
    if (navigator.userAgent.match(/Android/i)) {
      device = 'Android';
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      device = 'iOS';
    }
    sessionStorage.setItem('device', device);
  }
  setReady(ready: boolean) {
    this._ready = ready;
    this.isReady.next(ready);
  }

  public get hasReady() {
    return this._ready;
  }

  public get device() {
    return sessionStorage.getItem('device');
  }

  mobileVersion () { 
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/mobileVersion`).subscribe((data) => resolve(data), (error)=> reject(error));
    });
  };

  mobileVersionDevice() {
    return new Promise((resolve, reject) => {
      if(cordova.getAppVersion.getVersionNumber() != undefined) {
        cordova.getAppVersion.getVersionNumber().then(version => {
          resolve(version);
        });
      }
    });
  }
}
