import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class LogAccessService {
  rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  apiResourceUri: string = `${this.rootApiUri}/logAccess`;
  constructor(private http: HttpClient) { }

  save(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/logsave`, model).subscribe((data) => resolve(data), (error)=> reject(error));
    });
   };
   
}
