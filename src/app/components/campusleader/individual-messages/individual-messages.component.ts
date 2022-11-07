import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ParentStudentTermFilterModel } from 'src/app/models/ISchool';
import { FamilyCount } from 'src/app/models/ITeacher';
import { ApiService } from 'src/app/services/api.service';
import { StudentsService } from '../../../services/students/students.service';

@Component({
  selector: 'app-individual-messages',
  templateUrl: './individual-messages.component.html',
  styleUrls: ['./individual-messages.component.css']
})
export class IndividualMessagesComponent implements OnInit, OnChanges {
  @Input() schoolId:any;

  grades:any;
  gradeId: string = '0';
  searchName: string = '';
  students: Array<any> = [];
  subject:string;
  message:string;
  familyCount: FamilyCount;
  parentsUsisArray:number[];
  selectedGradeName: any;


  public parentStudentTermFilter: ParentStudentTermFilterModel;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.services.schools.getGradeLevels(this.schoolId).subscribe((data) => {
      this.grades = data;
      this.gradeId = this.grades[0].id;
        this.setGradeSelectedName();
       // this.getTeacherStudents();
    });
  }

  setGradeSelectedName(){
    this.selectedGradeName = this.grades.find(g=>g.id === Number.parseInt(this.gradeId, 0)).name;
  }

  ngOnChanges() {
    this.apiService.services.schools.getGradeLevels(this.schoolId).subscribe((data) => {
      this.grades = data;
      this.gradeId = this.grades[0].id;
     // this.getTeacherStudents();
      this.setGradeSelectedName();

    });
  }

  onChangeGrade(){
    this.getTeacherStudents();
  }

  updateRecipientsUSI(value: number[]) {
    // alert('update from parent')

    this.parentsUsisArray = value;
    // alert(JSON.stringify(value))
  }

  getTeacherStudents(){
    const grade = Number.parseInt(this.gradeId, 0);
    let gradesList: number[] = [];

    if (grade === 0) {
      this.grades.forEach(element => {
        gradesList.push(element.id);
      });
      gradesList.shift();

    } else {
      gradesList.push(grade);
    }
   
    this.parentStudentTermFilter = {
      gradeLevels: {pageSize: 100, skipRows: 0, grades: gradesList}, // 919
      schoolId: this.schoolId, // 56,
      searchTerm: this.searchName
    };
    
    this.apiService.services.communications.getParentStudentByTermAndGradeLevel(this.parentStudentTermFilter)
                            .subscribe((students: any) => {
                              if (students.length > 0) {
                                this.students = students;
                                this.apiService.services.students.setStudentIds(this.students.map((x) => { return x.studentUsi; }));
                        
                              } else {
                                alert('No students found with that search criteria');
                              }
                            },(error) => {
                              alert(JSON.stringify(error))
                            });

  }

  sendGroupMessage(){
    if (!this.message || this.message.length == 0 || this.subject.length == 0)
    {
      alert('Please add the subject and the message body.');
      return;
    }
    var audienceNumber="";
    
    if(this.parentsUsisArray.length==0 || this.parentsUsisArray.length==1){
      audienceNumber=this.parentsUsisArray.length + " person";
    }else{
      audienceNumber=this.parentsUsisArray.length + " people";
    }   
    if(confirm("Are you sure you want to send this message to "+ audienceNumber +"?")){
      const grade = Number.parseInt(this.gradeId, 0);
      let gradesList: number[] = [];
      
      if (grade === 0) {
        this.grades.forEach(element => {
          gradesList.push(element.id);
        });
        
        gradesList.shift();
      } else {
        gradesList.push(grade);
      }

      var request = {
        gradeLevels: gradesList,
        parentsUsis:this.parentsUsisArray,
        message: this.message.replace(/\n/g, " <br/> "),
        subject: this.subject,
        schoolId: this.schoolId,
        audience: `${this.selectedGradeName}  ( ${audienceNumber} )`
      };
      this.apiService.services.communications.postIndividualMessagePrincipals(request).then((data) => {
        this.message = '';
        this.subject = '';
        confirm('Message successfully sent!')
  
      }).catch((err)=>{
        confirm(JSON.stringify(err))
      });
      
    }
  }
}
