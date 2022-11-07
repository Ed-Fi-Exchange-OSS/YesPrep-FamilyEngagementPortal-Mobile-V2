import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class MeService {
  rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  apiResourceUri: string = `${this.rootApiUri}/me`;
  config : HttpHeaders;
  private briefProfile: any;
  constructor(private http: HttpClient) { }

  getRole() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/role`).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getMyBriefProfile() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/briefProfile`).subscribe((data) => {
        this.briefProfile = data;
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }

  getMyProfile() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/profile`).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }

  saveMyProfile(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/profile`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    }) 
    
  }

  uploadImage(formData) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/image`, formData).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    }) 
  }

  setBriefProfile(newBriefProfile) {
    this.briefProfile = newBriefProfile;
  }

  getBriefProfile() {
    return this.briefProfile;
  }

  updateProfileLanguage(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/language`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    }) 
  }
}
 