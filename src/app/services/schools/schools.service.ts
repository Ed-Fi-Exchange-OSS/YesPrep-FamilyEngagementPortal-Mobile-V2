import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SchoolBriefDetailModel } from 'src/app/models/ISchool';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  rootApiUri = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  apiResourceUri = `${this.rootApiUri}/schools`;

  constructor(private http: HttpClient) { }


  getGradeLevels(schoolId: number) {
    return this.http.get(`${this.apiResourceUri}/${schoolId}/gradesLevels`);
  }

  getSchoolsByPrincipal() {
    return this.http.get(`${this.apiResourceUri}/getSchoolsByPrincipal`);
  }

  getPrograms(schoolId: number) {
    return this.http.get(`${this.apiResourceUri}/${schoolId}/programs`);
  }
}
