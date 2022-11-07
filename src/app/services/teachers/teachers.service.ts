import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TeacherStudentsRequestModel } from 'src/app/models/ITeacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  rootApiUri = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  apiResourceUri = `${this.rootApiUri}/teachers`;

  constructor(private http: HttpClient) { }


  getSections() {
    return this.http.get(`${this.apiResourceUri}/sections`);
  }

  getTeachersStudents(request: TeacherStudentsRequestModel) {
    return this.http.post(`${this.apiResourceUri}/students`, request);
  }

}
