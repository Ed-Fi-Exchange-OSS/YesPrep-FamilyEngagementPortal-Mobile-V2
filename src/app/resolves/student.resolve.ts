import { ApiService } from './../services/api.service';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class StudentResolve implements Resolve<any> {
    constructor(private api: ApiService){}
    resolve(route: ActivatedRouteSnapshot) {
        // return this.api.services.students.get(route.params.studentId);
        return this.api.services.students.getStudentBriefDetail(route.params.studentId);
    }
    
}