import { Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TranslateResolve implements Resolve<any> {
    constructor(private api: ApiService) { }
    resolve() {
        return this.api.services.translate.getAvailableLanguages();
    }

}