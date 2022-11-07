import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ParentService {
  rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  apiResourceUri: string = `${this.rootApiUri}/parents`;

  constructor(private http: HttpClient) { }

  getStudents() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/students`).subscribe((data) => {
        resolve(data);
      },(error) => {
        reject(error);
      });
    });
  }
}
