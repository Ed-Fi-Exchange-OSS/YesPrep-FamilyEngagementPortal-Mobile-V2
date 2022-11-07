import { environment } from './../../../environments/environment';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OAuthService } from './oauth.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent } from '@angular/common/http';
import { EMPTY, Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
    helper: any;
    urlsToNotUse: Array<string>;
    constructor(private authServices: OAuthService, private router: Router) {
        this.helper = new JwtHelperService();
        this.urlsToNotUse = ['public', 'OAuth', 'log', 'mobileVersion', 'languages'];
    }

    intercept(request: import('@angular/common/http').HttpRequest<any>,
        next: import('@angular/common/http').HttpHandler): Observable<HttpEvent<any>> {
        /** OAuth Validator */
        if (request.url.includes('experience')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('apple_token')}`,
                    ContentType: 'application/json'
                }
            });
            return next.handle(request);
        }

        /** OAuth Validator */
        if (request.url.includes('OAuth')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    ContentType: 'application/json'
                }
            });
            return next.handle(request);
        }

        if (!this.isValidRequestForInterceptor(request.url)) {
            return next.handle(request);
        }

        /** OAuth Validator */
        var conf = environment.azureAd.mode == 'B2B' ? environment.azureAd.b2b : environment.azureAd.btc;
        if (request.url.match(conf.instance)) {
            request = request.clone({
                setHeaders: {
                    ContentType: 'application/x-www-form-urlencoded'
                }
            });
            return next.handle(request);
        }



        /** OAuth Validator */
        let expirationDate = this.helper.getTokenExpirationDate(this.authServices.accessToken());

        let exDate = new Date(expirationDate);
        exDate.setMinutes(exDate.getMinutes() - 10);

        let today = new Date();

        let token = this.helper.decodeToken(this.authServices.accessToken());
        if (token != null) {
            if (today >= exDate) {
                return from(this.authServices.refreshToken()).pipe(switchMap(isRefresh => {
                    if (isRefresh) {
                        request = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${this.authServices.accessToken()}`,
                                ContentType: 'application/json'
                            }
                        });
                        return next.handle(request);
                    } else {
                        this.router.navigate(['login']);
                        return EMPTY;
                    }

                }));
            } else {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.authServices.accessToken()}`,
                        ContentType: 'application/json'
                    }
                });
                return next.handle(request);
            }
        }
        else {
            this.router.navigate(['login']);
            return EMPTY;
        }
    }

    private isValidRequestForInterceptor(requestUrl: string): boolean {
        for (let address of this.urlsToNotUse) {
            if (requestUrl.includes(address))
                return false;
        }
        return true;
    }
}