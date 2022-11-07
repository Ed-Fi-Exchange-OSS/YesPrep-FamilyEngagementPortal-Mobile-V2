import { MeService } from './../me/me.service';
import { Subject } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignarRService } from '../signarRService/signar-r.service';
import { ParentStudentTermFilterModel,ParentStudentTermProgramFilterModel } from 'src/app/models/ISchool';

@Injectable()
export class CommunicationService {
  private rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  private apiResourceUri: string = `${this.rootApiUri}/communications`;
  private emitMessageReceived = new Subject<any>();
  public messageReceived = this.emitMessageReceived.asObservable();

  config : HttpHeaders;
  constructor(private http: HttpClient, private signalRService: SignarRService, private me: MeService) { }

  startChatEngine() {
    let chathub = this.signalRService.init('ChatHub');

    chathub.on('messageReceived', (message) => {
      this.emitMessageReceived.next(message);
    });

    chathub.start();
  }

  emitMessage(message) {
    this.emitMessageReceived.next(message);
  }

  recipientUnread() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/recipientUnread`).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  allRecipients(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/allRecipients`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getChatThread(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/thread`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  postMessage(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/persist`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }

  recipientRead(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/recipientRead`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }

  postGroupMessage(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/groupMessages`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }

  postGroupMessagePrincipals(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/groupMessages/principals`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }
  postIndividualMessagePrincipals(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/groupMessages/individual/principals`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }
  getParentStudentCountInSection(model) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/families/calculate/section`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }

  getParentStudentCountInGradesAndPrograms(model){
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/families/calculate`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }
  
  getParentStudentByTermAndGradeLevel(parentStudentTermFilter: ParentStudentTermFilterModel) {
    return this.http.post(`${this.apiResourceUri}/families/search`, parentStudentTermFilter);
  }

  getStudentByTermAndGradeLevel(parentStudentTermFilter: ParentStudentTermFilterModel) {
    return this.http.post(`${this.apiResourceUri}/families/searchstudents`, parentStudentTermFilter);
  }
  getStudentByTermGradeLevelAndPrograms(parentStudentTermFilter: ParentStudentTermProgramFilterModel) {
    return this.http.post(`${this.apiResourceUri}/families/searchstudentsprograms`, parentStudentTermFilter);
  }
  getGroupMessagesQueues(schoolId,model){
    return new Promise((resolve, reject) => {
     this.http.post(`${this.apiResourceUri}/groupMessages/${schoolId}/queue`, model).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
  }
  uploadImage(image){
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/image`, image).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    }) 
  }

  uploadImageString(image){
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/imagebase`, image).subscribe((data) => {
        resolve(data);
      }, (error) => {
        console.log('error sending image ')
        console.log(JSON.stringify(error))
        reject(error);
      })
    }) 
  }

  uploadImageiOS(image){
    console.log('uploading file with parameters')
    console.log(image)
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiResourceUri}/imagefromios`, image).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    }) 
  }
}
