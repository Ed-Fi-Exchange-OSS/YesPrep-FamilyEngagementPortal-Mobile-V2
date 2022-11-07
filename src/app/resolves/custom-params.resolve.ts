import { ApiService } from './../services/api.service';
import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';

@Injectable()
export class CustomParamstResolve implements Resolve<any> {
    constructor(private api: ApiService){}
    resolve() {
        return this.api.services.customParameters.getAll()
    }
}

