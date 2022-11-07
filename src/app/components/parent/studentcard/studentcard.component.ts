import { ApiService } from './../../../services/api.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'student-card',
  templateUrl: './studentcard.component.html',
  styleUrls: ['./studentcard.component.css']
})
export class StudentcardComponent  implements OnInit {

  @Input() studentObj: any;
  @Input() customParams: any;
  studentAbc: any;
  firstRowIndicators: string = "col-6"
  secondRowIndicators: string = "col-6"
  constructor(private api: ApiService) {
    this.api.services.communications.messageReceived.subscribe(() =>{
      this.api.services.communications.recipientUnread().then((data: any) => {
        let unreadMessagePerStudent = data.unreadMessages.find(student => {
            return student.studentUniqueId == this.studentObj.studentUniqueId;
        });
        this.studentObj.unreadMessageCount = unreadMessagePerStudent.unreadMessageCount;
      }).catch(error => console.log("error in reacipientUnread" + error));
    });
   }
  ngOnInit(): void {
    this.customParams.featureToggle.forEach(ft => {
      if(ft.route == 'landing') {
        ft.features.forEach(f => {
          if(f.studentAbc != null){
            this.studentAbc = f.studentAbc
          }
        });
      }
    });
    this.indicatorStyle()
  }

  cleanUrlImage(url) {
    let img = url.replace('clientapp/', '');
    return img;
  }

  showStudentGPA(gradeLevel) {
    var dbGradeLevels = ["Eighth grade", "Ninth grade", "Tenth grade", "Eleventh grade", "Twelfth grade", "8", "08", "9", "09", "10", "11", "12"];
    return dbGradeLevels.indexOf(gradeLevel) != -1;
  }

  indicatorStyle() {
    let countInactiveFirstRow= 0, countInactiveSecondRow = 0;
    Object.keys(this.studentAbc).forEach(key => {
      if(!this.studentAbc[key] && (key == 'absence' || key== 'courseAverage'))
        countInactiveFirstRow++;
      else if (!this.studentAbc[key] && (key == 'behavior' || key== 'missingAssignments'))
        countInactiveSecondRow++;
    });
    if (countInactiveFirstRow > 0) {
      this.firstRowIndicators = 'col-12';
    }

    if (countInactiveSecondRow > 0) {
      this.secondRowIndicators = 'col-12';
    }
  }
}
