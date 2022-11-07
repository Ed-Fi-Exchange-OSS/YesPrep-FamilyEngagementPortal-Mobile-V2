import { HttpClient } from '@angular/common/http';
import { AzureService } from './providers/azure/azure.service';
import { Injectable } from '@angular/core';
import { AppleService } from './providers/apple/apple.service';
import { environment } from 'src/environments/environment';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class OAuthService {
  private rootApiUri: string = `${environment.api.apiEndpoint}OAuth`;
  constructor(private azureProvider: AzureService, private applePrivider: AppleService, private http: HttpClient) { }

  logIn() {
    return this.azureProvider.logIn();
  }
  biometricLogIn() {
    return this.azureProvider.biometricLogIn();
  }
  logOut() {
   return this.azureProvider.logOut();
  }
  userInfo() : string {
    return localStorage.getItem('email');
  }
  accessToken() {
    return this.azureProvider.accessToken();
  }
  isAuthenticated() {
    return this.azureProvider.isAuthenticated();
  }
  refreshToken() {
    return this.azureProvider.refreshToken();
  }
  clearSessionToken() {
    localStorage.clear();
  }

  logInWithApple() {
    return this.applePrivider.logIn();
  }

  experienceUserLogin() {
    return new Promise((resolve, reject) => {
        this.http.get(`${this.rootApiUri}/user/experience`).subscribe((data: any) => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.access_token);
            //Token will be deleted after an hour
            let expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 1);
            localStorage.setItem('loginExpiration', stringify(expirationDate));
            resolve(true);
        }, error => {
           // console.log(error);
            reject(error);
        });
    });
}
}
