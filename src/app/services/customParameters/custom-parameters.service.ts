import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomParametersService {
  private rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  constructor(private http: HttpClient) { }

  getAll() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.rootApiUri}/CustomParameters`).subscribe((data) => resolve(data), (error)=> reject(error));
    });
  }
}
