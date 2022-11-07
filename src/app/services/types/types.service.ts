import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class TypesService {
  private rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  private apiResourceUri: string = `${this.rootApiUri}/types`;
  constructor(private http: HttpClient) { }

  getMethodOfContactTypes() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/MethodOfContact`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      })
    });
  }

  getElectronicMailTypes() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/ElectronicMail`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  getTelephoneNumberTypes() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/TelephoneNumber`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    })
  }

  getTextMessageCarrierTypes() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/TextMessageCarrier`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    })

  }

  getAddressTypes() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/Address`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    })

  }

  getStateAbbreviationTypes() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/StateAbbreviation`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    })
  }
}
