import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatResolve implements Resolve<any> {
    constructor(private api: ApiService) { }
    resolve(route: ActivatedRouteSnapshot) {
        
        if(!route.params.recipientUniqueId || !route.params.recipientTypeId || !route.params.studentUsi)
            return null;
        let request = {
            studentUsi: route.params.studentUsi,
            recipientUniqueId: route.params.recipientUniqueId,
            recipientTypeId: route.params.recipientTypeId, 
            unreadMessageCount: route.params.unreadMessageCount
        }    
        return this.api.services.communications.getChatThread(request);
    }

}