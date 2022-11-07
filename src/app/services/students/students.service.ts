import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from 'src/app/models/IStudent';

@Injectable()
export class StudentsService {
  private rootApiUri: string = `${environment.api.apiEndpoint}${environment.api.rootApiUrl}`;
  private apiResourceUri: string = `${this.rootApiUri}/students`;
  private serviceStudentIds: number[] = [];

  constructor(private http: HttpClient) { }

  get(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/${id}`).subscribe((data: Student) => resolve(data), (error) => reject(error));
    });
  }
  getStudentBrief(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/${id}//brief`).subscribe((data) => resolve(data), (error) => reject(error));
    });
  }
  setStudentIds(studentIds: number[]) {
    this.serviceStudentIds = studentIds
  }
  getStudentIds() {
    return this.serviceStudentIds;
  }

  getStudentBriefDetail(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/${id}/detail`).subscribe((data) => resolve(data), (error) => reject(error));
    });
  }

  getStudentAttendance(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/${id}/detail/attendance`).subscribe((data) => resolve(data), (error) => reject(error));
    });
  }

  getStudentCourseGrades(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/${id}/detail/courseGrades`).subscribe((data) => resolve(data), (error) => reject(error));
    });
  }

  getStudentBehavior(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/${id}/detail/behavior`).subscribe((data) => resolve(data), (error) => reject(error));
    });
  }

  getStudentMissingAssignments(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/${id}/detail/missingAssignments`).subscribe((data) => resolve(data), (error) => reject(error));
    });
  }

  getStudentAssessments(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/${id}/detail/assessments`).subscribe((data) => resolve(data), (error) => reject(error));
    });
  }
  

  getStudentStaarAssessmentHistory(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/${id}/detail/staarAssessmentHistory`).subscribe((data) => resolve(data), (error) => reject(error));
    });
  }



  getStudentSchedule(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/${id}/detail/schedule`).subscribe((data) => resolve(data), (error) => reject(error));
    });
  }

  getStudentSuccessTeamMembers(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiResourceUri}/${id}/detail/successTeamMembers`).subscribe((data) => resolve(data), (error) => reject(error));
    });
  }
}
