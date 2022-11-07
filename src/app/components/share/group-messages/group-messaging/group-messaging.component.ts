import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Section, TeacherStudentsRequestModel,FamilyCount } from 'src/app/models/ITeacher';

@Component({
  selector: 'app-group-messaging',
  templateUrl: './group-messaging.component.html',
  styleUrls: ['./group-messaging.component.css']
})
export class GroupMessagingComponent implements OnInit, OnChanges {

  public messageReq: { subject: '', message: '' };
  @Input() role: string;
  //schoolId: number;
  @Input() schoolId:any;
  //@Input() programs:any;
  gradeLevels:any;
  programs:any;
  message:string;
  subject:string;
  familyCount: FamilyCount;
  public selectedSection: any;
  public StudentName: string = "";
  public CourseTitle: string = 'All Sections';
  public model: any;
  public request: TeacherStudentsRequestModel;
  public students: Array<any> = [];
  public GradeId: string = '0';
  public selectedProgramId: string = '0';
  public schools: any;
  public showSchools = false;
  
  gradeIds: any=[];
  programIds:any=[];
  selectedProgram: any;
  selectedGrade: any;
  selectedProgramName: any;
  selectedGradeName: any;
  
  requestAdmin:any;
  constructor(private apiService: ApiService) { }

  ngOnChanges() {
    this.apiService.services.schools.getGradeLevels(this.schoolId).subscribe((data) => {
      this.gradeLevels = data;
      this.GradeId = this.gradeLevels[0].id;
      this.apiService.services.schools.getPrograms(this.schoolId).subscribe((data) => {
        this.programs = data;
        this.selectedProgramId = this.programs[0].id;
        this.setGradeSelectedName();
        this.setProgramSelectedName();
        this.getParentsCountAdmin();

      });
    });
  }
  ngOnInit(): void {
    if(this.role === "teacher"){
      this.apiService.services.teachers.getSections().subscribe((data) => {
        this.model = data;
      });
      this.getParentsCountTeacher();
    }
  }

  setGradeSelectedName(){
    this.selectedGradeName = this.gradeLevels.find(g=>g.id === Number.parseInt(this.GradeId, 0)).name;
  }
  setProgramSelectedName(){
    this.selectedProgramName = this.programs.find(g=>g.id === Number.parseInt(this.selectedProgramId, 0)).name;
  }
  sendGroupMessage() {
    if (!this.message || this.message.length == 0 || this.subject.length == 0)
    {
      alert('Please add the subject and the message body.');
      return;
    }

    var audienceNumber="";
    
    if(this.familyCount.familyMembersCount==0 || this.familyCount.familyMembersCount==1){
      audienceNumber=this.familyCount.familyMembersCount + " person";
    }else{
      audienceNumber=this.familyCount.familyMembersCount + " people";
    }   
      
    if(confirm("Are you sure you want to send this message to "+ audienceNumber +"?")){
      if(this.role === "teacher"){
        var messageModel = {
          message: this.message.replace(/\n/g, " <br/> "),
          subject: this.subject,
          section:{},
          studentsCount:this.familyCount.familyMembersCount
        };
    
        if (this.CourseTitle === 'All Sections'){
          messageModel.section= { courseTitle: 'All Classes' }
        }else{
          messageModel.section= this.selectedSection
        }
        
    
        this.apiService.services.communications.postGroupMessage(messageModel).then((data) => {
          this.message = '';
          this.subject = '';
          confirm('Message successfully sent!')
    
        }).catch((err)=>{
          confirm(JSON.stringify(err))
        });
      }else{
        const grade = Number.parseInt(this.GradeId, 0);
        const program = Number.parseInt(this.selectedProgramId, 0);
    
        let gradesList: number[] = [];
        let programsList: number[] = [];
    
        if (grade === 0) {
          this.gradeLevels.forEach(element => {
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

        var request = {
          gradeLevels: gradesList,
          programs: programsList,
          message: this.message.replace(/\n/g, " <br/> "),
          subject: this.subject,
          schoolId: this.schoolId,
          audience: `${this.selectedGradeName} and ${this.selectedProgramName} ( ${audienceNumber} )`
        };

        this.apiService.services.communications.postGroupMessagePrincipals(request).then((data) => {
          this.message = '';
          this.subject = '';
          confirm('Message successfully sent!')
    
        }).catch((err)=>{
          confirm(JSON.stringify(err))
        });
      }
    }
  }

  onChangeSection() {
    this.getParentsCountTeacher();
  }                
    
  onChangeGrade(){
    this.getParentsCountAdmin();
    this.setGradeSelectedName();
  }

  onProgramChange(){
    this.getParentsCountAdmin();
    this.setProgramSelectedName();
  }


  getParentsCountAdmin(){
    const grade = Number.parseInt(this.GradeId, 0);
    const program = Number.parseInt(this.selectedProgramId, 0);

    let gradesList: number[] = [];
    let programsList: number[] = [];

    if (grade === 0) {
      this.gradeLevels.forEach(element => {
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

    this.requestAdmin = {
      grades: gradesList, programs: programsList, schoolId: this.schoolId
    }  

    
    this.apiService.services.communications.getParentStudentCountInGradesAndPrograms(this.requestAdmin).then( (data:FamilyCount) => {
      this.familyCount = data;

     })
     .catch(err => {
        alert('error: '+JSON.stringify(err))
     });
    
  }

  getParentsCountTeacher() {
    if (this.CourseTitle === 'All Sections') {
      this.request = {
        section: { courseTitle: 'All Sections' },
                studentName: this.StudentName
      };
    } else {
      this.selectedSection = this.model.find(s=>s.courseTitle == this.CourseTitle);

      this.request = {
        section: this.selectedSection,
        studentName: this.StudentName
      };
    }
   // alert(JSON.stringify(this.request))
    this.apiService.services.communications.getParentStudentCountInSection(this.request)
      .then( (data:FamilyCount) => {
       this.familyCount = data;
      // alert(JSON.stringify(data))

      })
      .catch(err => {
        //alert(JSON.stringify(err))
      });
  }


  public get enableSubmitButton(): boolean {
    return (!!this.subject && !!this.message) && (this.subject.length > 0 && this.message.length > 0);
  }

}
