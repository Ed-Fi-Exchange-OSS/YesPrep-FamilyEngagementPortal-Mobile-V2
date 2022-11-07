import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { MobileService } from 'src/app/services/common/mobile.service';
import { environment } from 'src/environments/environment';
import { ProviderServices } from '../providers.service';

declare var cordova: any;

@Injectable()
export class AppleService implements ProviderServices {
    private helper: any;
    private rootApiUri: string = `${environment.api.apiEndpoint}OAuth`;
    constructor(private platformService: MobileService, private http: HttpClient) {
        this.helper = new JwtHelperService();
    }
    logIn() {
        return new Promise((resolve, reject) => {
            if (this.platformService.hasReady) {
                this.getToken().then((token: any) => {
                    localStorage.setItem('apple_token', token.identityToken);
                    localStorage.setItem('email', this.getEmailFromJwt(token.identityToken));
                    const params = {
                        Client_token: token.identityToken
                    };
                    this.http.post(`${this.rootApiUri}/ExchangeToken`, params).subscribe((data: any) => {
                        localStorage.setItem('access_token', data.access_token);
                        localStorage.setItem('refresh_token', data.access_token);
                        let expirationDate = new Date();
                        expirationDate.setHours(expirationDate.getHours() + 1);
                        localStorage.setItem('loginExpiration', stringify(expirationDate));
                        resolve(true);
                    }, error => {
                        //console.log(error);
                        reject(error);
                    });
                });
            }
        });
    }

    getEmailFromJwt(jwt) : string {
        let decode = this.helper.decodeToken(jwt);
        return decode.email;
    }
    logOut() {
        localStorage.setItem('access_token', "");
    }
    accessToken() {
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
    getToken() {
        return new Promise((resolve, reject) => {
            cordova.plugins.SignInWithApple.signin(
                { requestedScopes: [0, 1] }, (success) => {
                    resolve(success);
                }, (err) => {
                    //console.error(err);
                    reject(err);
                }
            );
        });
    }
}