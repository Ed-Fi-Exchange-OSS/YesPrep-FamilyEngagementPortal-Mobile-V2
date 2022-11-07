import { TranslateService } from '@ngx-translate/core';
import { Attendance } from './../../../models/IStudent';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent {

  @Input() model: Attendance;
  @Input() showAll: any;

  constructor() { }
}
