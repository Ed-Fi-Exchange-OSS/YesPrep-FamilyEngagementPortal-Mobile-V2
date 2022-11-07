import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TranslateServices {
  private rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  private apiResourceUri: string = `${this.rootApiUri}/translate`;
  constructor(private http: HttpClient) { }

  getAvailableLanguages() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/languages`).subscribe((data: Array<any>) => {
        resolve(data.filter((x) => { return x.code != 'tlh'; }));
      })
    });
  }

  autoDetectTranslate(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/autoDetect`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }
}
