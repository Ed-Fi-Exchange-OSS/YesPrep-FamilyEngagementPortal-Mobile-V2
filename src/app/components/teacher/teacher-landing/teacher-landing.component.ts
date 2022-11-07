
import { Section, TeacherStudentsRequestModel } from 'src/app/models/ITeacher';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TeachersService} from 'src/app/services/teachers/teachers.service';
import { StudentBriefModel } from 'src/app/models/IStudent';
import { TeacherStudentListComponent } from '../../teacher-student-list/teacher-student-list.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

declare var cordova: any;

@Component({
  selector: 'app-teacher-landing',
  templateUrl: './teacher-landing.component.html',
  styleUrls: ['./teacher-landing.component.css']
})
export class TeacherLandingComponent implements OnInit {
  @Output() OnModelChange = new EventEmitter();
  public model: Array<Section>;
  public StudentName: string ="";
  public CourseTitle: string = 'All Sections';
  public orderValue: any;
  public orderBy: Array<object> = [
    //{id: '0', text: 'Default', order: 'ascending', propertyName: 'lastSurname'},
    {id: '1', text: 'A to Z', order: 'ascending', propertyName: 'lastSurname'},
    {id: '2', text: 'Z to A', order: 'descending', propertyName: 'lastSurname'},
    {id: '3', text: 'Absences: fewest first', order: 'ascending', propertyName: 'adaAbsences'},
    {id: '4', text: 'Absences: most first', order: 'descending', propertyName: 'adaAbsences'},
    //{id: '4', text: 'Discipline fewest first', order: 'ascending', propertyName: 'ytdDisciplineIncidentCount'},
    //{id: '5', text: 'Discipline most first', order: 'descending', propertyName: 'ytdDisciplineIncidentCount'},
    {id: '5', text: 'GPA: lowest first', order: 'ascending', propertyName: 'ytdgpa'},
    {id: '6', text: 'GPA: highest first', order: 'descending', propertyName: 'ytdgpa'},    
  ];
  schoolId:number;
  public students: Array<any> = [];
  public request: TeacherStudentsRequestModel;
  public section:Section;

  newVersion: boolean = false;
  isAndroid: boolean = true;

  constructor(private api: TeachersService, private translate: TranslateService, private route: ActivatedRoute,private apiService: ApiService) {
   this.model=new Array<Section>();
   this.isAndroid = sessionStorage.getItem('device') == 'Android';
  }


  ngOnInit(): void {
    this.api.getSections().subscribe((data:Array<Section>) => {
      this.model = data;
      if(this.model.length>=1)
        this.schoolId= this.model[0].schoolId;
  });
    if(localStorage.getItem("teachersStudents")!=null){
      this.students=JSON.parse(localStorage.getItem("teachersStudents"));
    }

    this.apiService.services.mobile.mobileVersion().then((mobileApiVersion: string) => {      
      this.apiService.services.mobile.mobileVersionDevice().then((mobileVersion: string) => { 
        let mav =  mobileApiVersion.split('.').map(Number);  
        let mv =  mobileVersion.split('.').map(Number);    
        
        if(mav[0]>mv[0]){
          this.newVersion = true;
        }else if(mav[0]=mv[0]){
          if(mav[1]>mv[1]){
            this.newVersion = true;
          }else if(mav[1]=mv[1]){
            if(mav[2]>mv[2]){
              this.newVersion = true;
            }
          }
        }
        
        /*if (mobileApiVersion > mobileVersion) {
          this.newVersion = true;
        }*/
      });
    });
  }


  onChange($value = null) {
    if($value) {
      this.orderValue=$value;
      this.sortStudentsList($value);
      this.apiService.services.students.setStudentIds(this.students.map((x) => { return x.studentUsi; }));
      localStorage.setItem("teachersStudents", JSON.stringify(this.students));
    }
    
  }

  private sortStudentsList($value): void {
    const orderByCriteria: any = $value!=undefined ? this.orderBy[$value[0]]:this.orderBy[0];
    if (orderByCriteria.order === 'ascending') {
      this.students.sort( (a,b) => (a[orderByCriteria.propertyName]+"").toString().localeCompare((b[orderByCriteria.propertyName]+"").toString()) );
    } else {
      this.students.sort( (a,b) => (b[orderByCriteria.propertyName]+"").toString().localeCompare((a[orderByCriteria.propertyName]+"").toString()) );
    }
  }

  onChangeSection(){
    if(localStorage.getItem("teachersStudents")!=null){
      this.getTeacherStudents();
    }
  }
  getTeacherStudents() {    
    if (this.section==undefined || this.section=='All Sections') {
      this.request = {
          section : {courseTitle: 'All Sections'},
          studentName: this.StudentName
        };
    } else {
      this.request = {
        section : this.section,
        studentName: this.StudentName
      };
    }
    
    this.api.getTeachersStudents(this.request).subscribe((studentsdata: any) => {
      if (studentsdata.length > 0) {
        this.students = studentsdata;
        this.sortStudentsList(this.orderValue);
        localStorage.setItem("teachersStudents", JSON.stringify(this.students));
        this.apiService.services.students.setStudentIds(this.students.map((x) => { return x.studentUsi; }));
      } else {
        alert('No students found with that search criteria');
      }
    });

  }

  public redirectToStore() {
    if (this.isAndroid) {
      cordova.InAppBrowser.open(environment.storesUrls.android, '_system', 'location=yes');
    } else {
      cordova.InAppBrowser.open(environment.storesUrls.ios, '_system', 'location=yes');
    }
  }

}
