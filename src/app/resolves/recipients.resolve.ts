import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipientsResolve implements Resolve<any> {
    constructor(private api: ApiService) { }
    resolve(route: ActivatedRouteSnapshot) {
        let studentUsi = null;
        if(route.params.studentUsi != undefined && route.params.studentUsi != "undefined") {
            studentUsi = route.params.studentUsi;
        }
        return this.api.services.communications.allRecipients({studentUsi: studentUsi, rowsToSkip: 0, rowsToRetrieve: 500});
    }

}