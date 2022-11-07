import { Section, TeacherStudentsRequestModel } from 'src/app/models/ITeacher';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TeachersService} from 'src/app/services/teachers/teachers.service';
import { StudentBriefModel } from 'src/app/models/IStudent';
import { TeacherStudentListComponent } from '../../teacher-student-list/teacher-student-list.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SchoolsService } from 'src/app/services/schools/schools.service';
import { ParentStudentTermProgramFilterModel, SchoolBriefDetailModel } from 'src/app/models/ISchool';
import { CommunicationService } from 'src/app/services/communication/communication.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

declare var cordova: any;


@Component({
  selector: 'app-campusleaderlanding',
  templateUrl: './campusleaderlanding.component.html',
  styleUrls: ['./campusleaderlanding.component.css']
})
export class CampusleaderlandingComponent implements OnInit {
  
  public model: any;
  public programs: any;
  public StudentName: string ="";
  public GradeId: string = '0';
  public SchoolId: number;
  public orderValue: string;
  public orderBy: Array<object> = [
    {id: '1', text: 'A to Z', order: 'ascending', propertyName: 'lastSurname'},
    {id: '2', text: 'Z to A', order: 'descending', propertyName: 'lastSurname'}
  ];
  selectedProgramId:string = '0';
  programIds:any=[];
  public students: Array<any> = [];
  public schools: any;
  public request: TeacherStudentsRequestModel;
  public showSchools = false;
  public parentStudentTermFilter: ParentStudentTermProgramFilterModel;
  newVersion: boolean = false;
  isAndroid: boolean = true;
  constructor(private api: TeachersService,
              private apiCommunication: CommunicationService,
              private apiSchool: SchoolsService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private apiService: ApiService) {
                this.isAndroid = sessionStorage.getItem('device') == 'Android';
  }


  ngOnInit(): void {
    this.apiSchool.getSchoolsByPrincipal().subscribe((res) => {
      this.schools = res;
      if ( this.schools.length === 1) {
        this.showSchools = false;
      } else {
        this.showSchools = true;
      }

      this.SchoolId = this.schools[0].schoolId;
      this.apiSchool.getGradeLevels(this.SchoolId).subscribe((data) => {
        this.model = data;
        this.GradeId = this.model[0].id;
      });
      this.apiSchool.getPrograms(this.SchoolId).subscribe((data) => {
        this.programs = data;
        this.selectedProgramId = this.programs[0].id;
      });

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

  onProgramChange(){
    this.getTeacherStudents();
  }

  onChangeGrade(){
    this.getTeacherStudents();
  }

  
  
  onChangeSchool() {
    this.apiSchool.getGradeLevels(this.SchoolId).subscribe((data) => {
      this.model = data;
      this.GradeId = this.model[0].id;
      this.apiSchool.getPrograms(this.SchoolId).subscribe((data) => {
        this.programs = data;
        this.selectedProgramId = this.programs[0].id;
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

  getTeacherStudents() {
    const grade = Number.parseInt(this.GradeId, 0);
    const program = Number.parseInt(this.selectedProgramId, 0);

    let gradesList: number[] = [];
    let programsList: number[] = [];
    if (grade === 0) {
      this.model.forEach(element => {
        gradesList.push(element.id);
      });
      gradesList.shift();

    } else {
      gradesList.push(grade);
    }
   
    if(program != 0){
      programsList.push(program);
    }else{
      this.programs.forEach(element => {
        programsList.push(element.id);
      });
      programsList.shift();

    }
    this.parentStudentTermFilter = {
      gradeLevels: {pageSize: 100, skipRows: 0, grades: gradesList}, // 919
      schoolId: this.SchoolId, // 56,
      searchTerm: this.StudentName,
      programs: programsList,
    };
    this.apiCommunication.getStudentByTermGradeLevelAndPrograms(this.parentStudentTermFilter).subscribe((studentsdata: any) => {
      this.students.length = 0;
      if (studentsdata.length > 0) {
        this.students = studentsdata;
        this.sortStudentsList(this.orderValue);
        localStorage.setItem("teachersStudents", JSON.stringify(this.students));
        this.apiService.services.students.setStudentIds(this.students.map((x) => { return x.studentUsi; }));

      } else {
        alert('No students found with that search criteria');
      }
    },(error) => {
      alert(JSON.stringify(error))
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
