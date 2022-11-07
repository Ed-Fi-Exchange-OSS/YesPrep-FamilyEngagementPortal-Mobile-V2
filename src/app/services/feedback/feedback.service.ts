import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class FeedbackService {
    rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
    apiResourceUri: string = `${this.rootApiUri}/feedback`;
  constructor(private http: HttpClient) { }

  persist(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/persist/public`, model).subscribe((data) => resolve(data), (error)=> reject(error));
    });
  }

  persistLogged(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/persist`, model).subscribe((data) => resolve(data), (error)=> reject(error));
    });
  }
}
