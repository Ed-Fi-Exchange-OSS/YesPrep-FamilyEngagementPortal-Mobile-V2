import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonService } from './../../../common/common.service';
import { environment } from './../../../../../environments/environment';
import { MobileService } from './../../../common/mobile.service';
import { Injectable } from '@angular/core';
import { ProviderServices } from '../providers.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { stringify } from '@angular/compiler/src/util';

declare var cordova: any;

@Injectable()
export class AzureService implements ProviderServices {
  private modeOauth = environment.azureAd.mode;
  private config = this.modeOauth == 'B2B' ? environment.azureAd.b2b : environment.azureAd.btc;
  private helper: any;
  private _redirectUrl = `${environment.api.apiEndpoint}${this.config.redirectUri}`;
  private rootApiUri: string = `${environment.api.apiEndpoint}OAuth`;

  constructor(private platformService: MobileService, private commonService: CommonService, private http: HttpClient) {
    this.helper = new JwtHelperService();
  }

  getToken() {
    return new Promise((resolve, reject) => {
      var redirectUrl = encodeURI(this._redirectUrl);
      var browser = cordova.InAppBrowser.open(`${this.config.instance}/${this.config.tenantId}/${this.config.policy}/oauth2/authorize?response_type=code&client_id=${this.config.clientId}&redirect_uri=${redirectUrl}&state=${this.commonService.NewGuid()}&scope=openid`, '_blank', 'location=no,clearcache=yes,zoom=no,toolbar=no');

      browser.addEventListener("loadstop", (event) => {
        this.getAccessToken(event, browser).then(result => {
          resolve(result);
        });
      });
    });
  }

  private checkForPasswordResetFlow(event, browser) {
    return new Promise((resolve, reject) => {
      var responseUrl = event.url;
      if (responseUrl !== undefined && responseUrl.match('https://familyportal.yesprep.org')) {
        resolve('password reset flow ended');
        browser.close();
      }
      else {
        reject('Not in the password reset flow.');
      }
    });
  }

  getEmailFromJwt(jwt): string {
    let decode = this.helper.decodeToken(jwt);
    return decode.unique_name;
  }
  logIn() {
    return new Promise((resolve, reject) => {
      if (this.platformService.hasReady) {

        this.getToken().then((token: string) => {
          //This takes into account 2 different flows:
          //1. A user initated a password reset and should be redirect back to the login
          //2. A user is login in and we should set the access token
          if (token == 'password reset flow ended') {
            resolve('comming back from password reset flow');
          }


          localStorage.setItem('access_token', token);
          localStorage.setItem('email', this.getEmailFromJwt(token));
          let expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 1);
          localStorage.setItem('loginExpiration', stringify(expirationDate));
          const params = {
            Client_Token: token
          };

          this.http.post(`${this.rootApiUri}/ExchangeToken`, params).subscribe((data: any) => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.access_token);
            resolve('comming back from login flow');
            // resolve(true);
          }, error => {
            //console.log(error);
            reject(error);
          });
        }).catch(err => {
          reject(err);
        });
      }
      else {
        alert('The devices is not ready to start the application');
      }
    })
  }

  biometricLogIn() {
    return new Promise((resolve, reject) => {
      if (this.platformService.hasReady) {
        const params = {
          Client_Token: localStorage.getItem('refresh_token')
        };
        this.http.post(`${this.rootApiUri}/ExchangeToken`, params).subscribe((data: any) => {
          localStorage.setItem('refresh_token', params.Client_Token);
          localStorage.setItem('access_token', data.access_token);
          let expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 1);
          localStorage.setItem('loginExpiration', stringify(expirationDate));
          resolve(true);
        }, error => {
          //console.log(error);
          reject(false);
        });

      }
    });
  }


  logOut() {
    return new Promise((resolve, reject) => {
      try {
        localStorage.clear();
        var browser = cordova.InAppBrowser.open(`https://login.windows.net/${this.config.tenantId}/oauth2/logout?post_logout_redirect_uri=${this._redirectUrl}`, '_blank', 'location=no,clearcache=yes,zoom=no,toolbar=no');
        browser.addEventListener("loadstop", (event) => {
          setTimeout(() => {
            browser.close();
          }, 1000);
        });
        resolve(true);
      } catch (error) {
        //console.log(error);
        reject(false);
      }

    });
  }

  public accessToken() {
    return localStorage.getItem('access_token');
  }

  isAuthenticated() {
    let token = localStorage.getItem('access_token');
    if (token == '') {
      return null;
    }
    let expirationDate = this.helper.getTokenExpirationDate(token);

    let exDate = new Date(expirationDate);
    exDate.setMinutes(exDate.getMinutes() - 5);

    let today = new Date();
    if (today >= exDate) {
      return null;
    }

    return token;
  }

  public refreshToken() {
    return new Promise((resolve, reject) => {
      if (this.platformService.hasReady) {
        const params = {
          Client_Token: localStorage.getItem('refresh_token')
        };
        this.http.post(`${this.rootApiUri}/ExchangeToken`, params).subscribe((data: any) => {
          localStorage.setItem('refresh_token', params.Client_Token);
          localStorage.setItem('access_token', data.access_token);
          let expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 1);
          localStorage.setItem('loginExpiration', stringify(expirationDate));
          resolve(true);
        }, error => {
          //console.log(error);
          resolve(false);
        });

      }
    });
  }

  private getCodeToken(array): string {
    let result = null;
    array.forEach(element => {
      if (!element.match(this.config.redirectUri)) {
        let propertiesSplit = element.split('&');
        propertiesSplit.forEach(p => {
          let splitForCleaning = p.split('#');
          splitForCleaning.forEach(item => {
            if (item.match('code')) {
              result = item.replace("code=", "");
              return result;
            }
          });
          
        });
      }
    });
    return result;
  }

  private getAccessToken(event, browser) {
    return new Promise((resolve, reject) => {
      var arrayResponse = event.url.split('?');if (arrayResponse !== undefined && arrayResponse.length > 0 && arrayResponse[0].match(this.config.redirectUri)) {
        var code = this.getCodeToken(arrayResponse);
        if (code === null) {
          reject('Problem in the time of decrypt the code from oauth');
          browser.close();
        }
        localStorage.setItem('code', code);
        const params = new HttpParams({
          fromObject: {
            client_id: this.config.clientId,
            scope: "openid offline_access",
            redirect_uri: this._redirectUrl,
            grant_type: "authorization_code",
            code: code
          }
        });
       
        browser.close();
        this.http.post(`${this.config.instance}/${this.config.tenantId}/${this.config.policy}/oauth2/token`, params).subscribe((data: any) => {
          resolve(data.id_token);
        }, error => {
          //console.log(error)
        });
      }
      else if (arrayResponse !== undefined && arrayResponse.length > 0 && arrayResponse[0].match('https://familyportal.yesprep.org')) {
        resolve('password reset flow ended');
        browser.close();
      }
    });
  }
}
