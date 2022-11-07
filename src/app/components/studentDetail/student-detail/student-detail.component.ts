import { MissingAssignments, Assessment, Schedule, StaarAssessmentHistory } from './../../../models/IStudent';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, Attendance, CourseGrades, Behavior } from 'src/app/models/IStudent';
declare var cordova: any;
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit, AfterViewInit {

  urls: any[] = [];
  studentId: string;
  parentUniqueId:string;
  isTeacher:boolean;
  anchor: string;
  model: Student;
  showAbsences: boolean = false;
  customParams: any;
  currentPos: number = 0;
  studentIds: any;
  isShowUpButton: boolean;
  topPosToStartShowing: number = 300;
  studentAbc: any;
  sections: any[] = [
    { name: 'Absences', id: 'attendance' },
    { name: 'Behavior', id: 'behaviour-log' },
    { name: 'Grades', id: 'grades' },
    { name: 'Assignments', id: 'missing-assignments' },
    { name: 'Schedule', id: 'schedule' },
    { name: 'Success Team', id: 'success-team' },
    { name: 'College Initiative Corner', id: 'college-corner' },
    { name: 'Assesments', id: 'assesments' }
  ];
  attendanceIndicatorCategories: any[] = [];
  isIOs: boolean = true;
  showStaarAssessmentHistory:boolean=false;

  constructor(private route: ActivatedRoute, private api: ApiService, private translate: TranslateService, private router: Router) {
    this.studentIds = this.api.services.students.getStudentIds(); 
    this.route.params.subscribe(p => {
      this.studentId = p.studentId, this.anchor = p.anchor
      if (p.successTeam != undefined || this.anchor != undefined) {
        this.api.services.share.emitBackButton(false, '');
      }
      this.currentPos = this.studentIds.indexOf(parseInt(this.studentId));
    });

    this.route.data.subscribe((data) => {
      this.model = data.studentInfo;
      this.customParams = data.customParams;
      this.api.services.share.emitTitleMenu(this.model.name);
    });

    this.anchor = this.route.snapshot.params.anchor;
  }

  ngOnInit() {
    window.scroll(0,0);
    this.api.services.me.getMyProfile().then((data: any) => {
      this.parentUniqueId=data.uniqueId;
    });
    this.api.services.me.getRole().then((data:any)=>{
      this.isTeacher =  data == "CampusLeader" || data == "Staff";
    })
    this.api.services.share.emitTitleMenu(this.model.name);

    this.api.services.landingRoutes.getRoute().then(route => {
      this.translate.get('Home').subscribe(label => {
        this.urls.push({ displayName: label, url: route });
      });
    });


    this.attendanceIndicatorCategories = [
      {
        tooltip: "Unexcused Absence",
        textDisplay: "Abv Unexcused Absences",
        value: this.model.attendance.unexcusedAttendanceEvents.length,
        interpretation: this.model.attendance.unexcusedInterpretation,
      },
      {
        tooltip: "Excused Absences",
        textDisplay: "Abv Excused Absences",
        value: this.model.attendance.excusedAttendanceEvents.length,
        interpretation: this.model.attendance.excusedInterpretation,
      },
      {
        tooltip: "Tardy Absences",
        textDisplay: "Abv Tardy Absences",
        value: this.model.attendance.tardyAttendanceEvents.length,
        interpretation: this.model.attendance.tardyInterpretation,
      },
    ];

    this.api.services.students.getStudentAttendance(this.studentId).then((attendance : Attendance) => {
      this.model.attendance = attendance
    });

    this.api.services.students.getStudentCourseGrades(this.studentId).then((courses: CourseGrades) => {
      this.model.courseGrades = courses;
    });

    this.api.services.students.getStudentBehavior(this.studentId).then((behavior: Behavior) => {
      this.model.behavior = behavior;
    });

    this.api.services.students.getStudentMissingAssignments(this.studentId).then((ma: MissingAssignments) => {
      this.model.missingAssignments = ma;
    });

    this.api.services.students.getStudentAssessments(this.studentId).then((assesment: Assessment) => {
      this.model.assessment = assesment;
    });

    this.api.services.students.getStudentStaarAssessmentHistory(this.studentId).then((staarAssessmentHistory: StaarAssessmentHistory) => {
      this.model.staarAssessmentHistory = staarAssessmentHistory; 
      //this.showStaarAssessmentHistory= staarAssessmentHistory==null ? false:true;
    });


    this.customParams.featureToggle.forEach(ft => {
      if(ft.route == 'studentdetail') {
        ft.features.forEach(f => {
          if(f.studentAbc != null){
            this.studentAbc = f.studentAbc
          }
        });
      }
    });
  }

  ngAfterViewInit(): void {
    if(this.anchor != undefined)
      this.gotoAnchor(this.anchor);

    this.currentPos = this.studentIds.indexOf(parseInt(this.studentId));
  }

  gotoAnchor(anchor: string) {
    let el = document.getElementById(anchor);
    el.scrollIntoView();
  }

  generateTranslationKey(prefix, value) {
    return prefix + value;
  }

  previousStudent() {
    return this.studentIds[this.currentPos - 1];
  }

  nextStudent() {
    return this.studentIds[this.currentPos + 1];
  }

  scrollUp() {
   window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing && this.api.services.mobile.device == 'Android') {
      this.isShowUpButton = true;
    } else {
      this.isShowUpButton = false;
    }
  }

  externalUrl(url) {
    let browser = cordova.InAppBrowser.open(url, '_system', 'location=yes');
    this.translate.get("Family Portal").subscribe(label => {
      this.api.services.share.emitTitleMenu(label);
    })
    browser.on('exit').subscribe(() => {
      this.router.navigate(['layout', 'studentdetail', this.model.studentUsi]);
    });
  }

  scrollTo(id) {
    let element = document.getElementById(id);
    var headerOffset = 20;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
  }
}
