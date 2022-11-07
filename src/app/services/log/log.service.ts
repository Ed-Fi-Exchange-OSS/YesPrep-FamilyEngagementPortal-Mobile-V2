import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class LogService {
  rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  apiResourceUri: string = `${this.rootApiUri}/log`;
  constructor(private http: HttpClient) { }

  logError(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/error`, model).subscribe((data) => resolve(data), (error)=> reject(error));
    });
   };

   logWarning(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/warning`, model).subscribe((data) => resolve(data), (error)=> reject(error));
    });
   };

   logInfo(model) { 
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/info`, model).subscribe((data) => resolve(data), (error)=> reject(error));
    });
   };
}
